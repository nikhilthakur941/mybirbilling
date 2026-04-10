import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

// ==========================
// GET ALL RENTALS
// ==========================
export async function GET() {
  try {
    const rentals = await prisma.rental.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rentals);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}

// ==========================
// CREATE RENTAL
// ==========================
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = form.get("name") as string;
    const price = Number(form.get("price"));
    const type = form.get("type") as "SCOOTY" | "CAMERA";

    const priceType = type === "CAMERA" ? "FLY" : "DAY";

    const images: { title: string; url: string }[] = [];

    const uploadFile = async (file: File, title: string) => {
      if (!file || file.size === 0) return;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto" },
            (err, res) => (err ? reject(err) : resolve(res))
          )
          .end(buffer);
      });

      images.push({
        title,
        url: result.secure_url,
      });
    };

    await uploadFile(form.get("front") as File, "front");
    await uploadFile(form.get("side") as File, "side");

    const rental = await prisma.rental.create({
      data: {
        name,
        price,
        type,
        priceType,
        image: images,
      },
    });

    return NextResponse.json(rental, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create rental" },
      { status: 500 }
    );
  }
}