import { Prisma } from "@/app/generated/prisma/client";

 

export const connectToDatabase = async () => {
  try {
    await Prisma.$connect();
    console.log("Database connected");
    return Prisma;
  } catch (error) {
    console.log("Database connection error", error);
    throw error; // important to propagate error
  }
}
