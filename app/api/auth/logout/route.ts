import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {

    // get cookie
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    // delete session safely
    if (sessionId) {
      await prisma.session.deleteMany({
        where: {
          id: sessionId,
        },
      });
    }

    // response
    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    // clear cookie
    response.cookies.set("sessionId", "", {
      expires: new Date(0),
      path: "/",
    });

    return response;

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
