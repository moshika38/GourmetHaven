import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const { uid, email, name } = await req.json();

    if (!uid || !email || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        uid,
        email,
        name,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: " error" +error},
      { status: 500 }
    );
  }
};
