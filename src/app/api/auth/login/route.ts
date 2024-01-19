import { NextResponse } from "next/server";
import { nextAuthOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/utils/prisma";

export async function POST(req: any, res: any) {
	const {userName, password} = await req.json();

  if (password !== 'adminPassword') {
    return NextResponse.error()
  }

  const resp = await prisma?.user.findUnique({
    where: {
      userName: userName
    },
    select: {
      email: true, 
      id: true,
      name: true,
      password: true,
      userName: true
    }
  });


	return NextResponse.json(resp);
}