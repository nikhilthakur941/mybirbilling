import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";


// ===============================
// GET ALL STAYS
// ===============================
export async function GET() {
  try {
    const stays = await prisma.stay.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(stays);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch stays" },
      { status: 500 }
    );
  }
}


// ===============================
// CREATE STAY (WITH CLOUDINARY)
// ===============================
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = (form.get("name") as string)?.trim();
    const price = Number(form.get("price") || 0);

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // ===============================
    // IMAGE ARRAY
    // ===============================
    const images: {
      title: string;
      url: string;
    }[] = [];

    // ===============================
    // CLOUDINARY UPLOAD HELPER
    // ===============================
    const uploadToCloudinary = async (file: File, title: string) => {
      if (!file || file.size === 0) return;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image" },
            (err, res) => (err ? reject(err) : resolve(res))
          )
          .end(buffer);
      });

      images.push({
        title,
        url: result.secure_url,
      });
    };

    // ===============================
    // GET FILES FROM FORM
    // ===============================
    const bedroom = form.get("bedroom") as File;
    const bathroom = form.get("bathroom") as File;
    const view = form.get("view") as File;

    // ===============================
    // UPLOAD FILES
    // ===============================
    await uploadToCloudinary(bedroom, "Bedroom");
    await uploadToCloudinary(bathroom, "Bathroom");
    await uploadToCloudinary(view, "View");

    // ===============================
    // CREATE IN DB
    // ===============================
    const stay = await prisma.stay.create({
      data: {
        name,
        price,
        priceType: "DAY",
        images, // ✅ stored as JSON
      },
    });

    return NextResponse.json(stay, { status: 201 });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to create stay" },
      { status: 500 }
    );
  }
}