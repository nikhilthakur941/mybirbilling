import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

interface RentalConnectInput {
  rental: { connect: { id: number } };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      guestName,
      guestEmail,
      guestPhone,
      guestCount,
      packageId,
      stayId,
      rentalIds = [],
    } = body;

    // ================= VALIDATION =================
    if (!guestName || !guestPhone || !packageId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const parsedGuestCount = Number(guestCount ?? 1);
    if (!Number.isInteger(parsedGuestCount) || parsedGuestCount < 1) {
      return NextResponse.json(
        { error: "guestCount must be a positive integer" },
        { status: 400 }
      );
    }

    if (!Array.isArray(rentalIds)) {
      return NextResponse.json(
        { error: "rentalIds must be an array" },
        { status: 400 }
      );
    }

    const parsedRentalIds = rentalIds.map(Number);
    if (parsedRentalIds.some(isNaN)) {
      return NextResponse.json(
        { error: "Invalid rental IDs" },
        { status: 400 }
      );
    }

    // ================= FETCH DATA (PARALLEL) =================
    const [pkg, stay, rentals] = await Promise.all([
      prisma.package.findUnique({
        where: { id: Number(packageId) },
      }),

      stayId != null
        ? prisma.stay.findUnique({ where: { id: Number(stayId) } })
        : Promise.resolve(null),

      parsedRentalIds.length > 0
        ? prisma.rental.findMany({
            where: { id: { in: parsedRentalIds } },
          })
        : Promise.resolve([]),
    ]);

    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    if (stayId != null && !stay) {
      return NextResponse.json({ error: "Invalid stay" }, { status: 400 });
    }

    // check missing rentals
    if (rentals.length !== parsedRentalIds.length) {
      const foundIds = new Set(rentals.map((r) => r.id));
      const missing = parsedRentalIds.filter((id) => !foundIds.has(id));
      return NextResponse.json(
        { error: `Invalid rental IDs: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // ================= PRICING =================
    const packageTotal = Number(pkg.price) * parsedGuestCount;
    const stayTotal = stay ? Number(stay.price) : 0;
    const rentalsTotal = rentals.reduce((sum, r) => sum + Number(r.price), 0);

    const totalAmount = packageTotal + stayTotal + rentalsTotal;

    const rentalsData: RentalConnectInput[] = rentals.map((r) => ({
      rental: { connect: { id: r.id } },
    }));

    // ================= CREATE BOOKING =================
    const booking = await prisma.booking.create({
      data: {
        guestName,
        guestEmail: guestEmail || null,
        guestPhone,
        guestCount: parsedGuestCount,

        packageId: Number(packageId),
        stayId: stayId != null ? Number(stayId) : null,

        totalAmount,
        advancePaid: 0,
        balanceDue: totalAmount,

        status: "PENDING",
        paymentStatus: "PENDING",
        cancelToken: uuidv4(),

        ...(rentalsData.length > 0 && {
          rentals: { create: rentalsData },
        }),
      },
      include: {
        package: true,
        stay: true,
        rentals: { include: { rental: true } },
      },
    });

    return NextResponse.json(booking, { status: 201 });

  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return NextResponse.json(
      { error: "Booking failed" },
      { status: 500 }
    );
  }
}