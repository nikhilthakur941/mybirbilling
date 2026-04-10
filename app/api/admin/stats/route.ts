import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalBookings = await prisma.booking.count();

    const revenueAgg = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        package: true,
      },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalBookings,
        revenue: Number(revenueAgg._sum.totalAmount ?? 0),
      },
      recentBookings,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}