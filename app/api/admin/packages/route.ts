import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";


// ✅ GET ALL PACKAGES
export async function GET() {
  try {
    const data = await prisma.package.findMany({
      include: { media: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}


// ✅ CREATE PACKAGE
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = (form.get("name") as string)?.trim();
    const description = (form.get("description") as string) || "";
    const price = Number(form.get("price") || 0);
    const duration = Number(form.get("duration") || 0);

    // ✅ ADD DETAILS (NEW)
    const details = JSON.parse(
      (form.get("details") as string) || "[]"
    );

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const files = form.getAll("files") as File[];

    const uploadedMedia: {
      url: string;
      type: "IMAGE" | "VIDEO";
    }[] = [];

    // ✅ upload each file to Cloudinary
    for (const file of files) {
      if (!file || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto" },
            (err, res) => (err ? reject(err) : resolve(res))
          )
          .end(buffer);
      });

      uploadedMedia.push({
        url: result.secure_url,
        type: result.resource_type === "video" ? "VIDEO" : "IMAGE",
      });
    }

    const pkg = await prisma.package.create({
      data: {
        name,
        description,
        price,
        duration,

        // ✅ SAVE DETAILS (NEW)
        details,

        media: {
          create: uploadedMedia,
        },
      },
      include: { media: true },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}