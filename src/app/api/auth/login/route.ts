import { NextResponse } from "next/server";
import { nextAuthOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/utils/prisma";

export async function POST(req: any, res: any) {
	const {userName, password} = await req.json();

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


  console.log('body', resp);

	// console.log("order", {});

	return NextResponse.json(resp);
}