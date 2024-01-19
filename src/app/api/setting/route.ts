import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/utils/prisma";

export async function POST(req: any, res: any) {
  const { phoneNumber }: any = await req.json();


  const resp = await prisma.configs.update({
    where: {
      name: 'contact'
    },
    data: {
      phoneNumber
    }
  });

  return NextResponse.json(resp);
}

export async function GET() {
  const categories = await prisma.configs.findFirst({
    where: {
      name: {
        equals: 'contact'
      }
    }
  });

  
  return NextResponse.json(categories);
}


export async function PUT(req: any, res: any) {
  const { phoneNumber, id }: any = await req.json();


  const categories = await prisma.configs.update({
    data: {
      phoneNumber: phoneNumber
    },
    where: {
      name : 'contact'
    }
  })

  return NextResponse.json(categories);
}

export async function DELETE(req: any, res: any) {
  const data = await req.json();

  await prisma.order.delete({
    where: {
      id: data,
    },
  });


  return NextResponse.json({
    status: 200,
  });
}
