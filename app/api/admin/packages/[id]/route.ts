import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";


// ===============================
// GET SINGLE
// ===============================
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const pkg = await prisma.package.findUnique({
    where: { id: Number(id) },
    include: { media: true },
  });

  return NextResponse.json(pkg);
}


// ===============================
// DELETE PACKAGE (cascade media)
// ===============================
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.package.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}


// ===============================
// UPDATE PACKAGE + MEDIA + DETAILS
// ===============================
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const form = await req.formData();

  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const price = Number(form.get("price"));
  const duration = Number(form.get("duration"));

  // ✅ ADD DETAILS
  const details = JSON.parse(
    (form.get("details") as string) || "[]"
  );

  // media to keep
  const keepIds = JSON.parse(
    (form.get("keepMediaIds") as string) || "[]"
  );

  const files = form.getAll("files") as File[];

  const packageId = Number(id);

  // ------------------
  // existing media
  // ------------------
  const existing = await prisma.media.findMany({
    where: { packageId },
  });

  // ------------------
  // delete removed media
  // ------------------
  const toDelete = existing.filter((m) => !keepIds.includes(m.id));

  for (const m of toDelete) {
    try {
      const publicId = m.url.split("/").pop()?.split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "auto",
        });
      }
    } catch {}

    await prisma.media.delete({ where: { id: m.id } });
  }

  // ------------------
  // upload new media
  // ------------------
  const uploadedMedia: any[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (err, res) => {
          if (err) reject(err);
          resolve(res);
        })
        .end(buffer);
    });

    uploadedMedia.push({
      url: result.secure_url,
      type: result.resource_type === "video" ? "VIDEO" : "IMAGE",
      packageId,
    });
  }

  // ------------------
  // update package (WITH DETAILS)
  // ------------------
  await prisma.package.update({
    where: { id: packageId },
    data: {
      name,
      description,
      price,
      duration,

      // ✅ SAVE DETAILS
      details,
    },
  });

  // ------------------
  // add new media
  // ------------------
  if (uploadedMedia.length) {
    await prisma.media.createMany({
      data: uploadedMedia,
    });
  }

  return NextResponse.json({ success: true });
}


// ===============================
// TOGGLE ACTIVE
// ===============================
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.package.update({
    where: { id: Number(id) },
    data: { isActive: body.isActive },
  });

  return NextResponse.json(updated);
}