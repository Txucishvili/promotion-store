import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/utils/prisma";

export async function POST(req: any, res: any) {
  const { phoneNumber }: any = await req.json();


  const resp = await prisma.contact.update({
    where: {
      phoneNumber: {
        equals: phoneNumber
      },
    },
    data: {
      phoneNumber
    }
  });

  return NextResponse.json(resp);
}

export async function GET() {
  const categories = await prisma.contact.findMany({
    take: 1,
    where: {
      phoneNumber: {
        equals: undefined
      }
    }
  });

  console.log('object', categories)
  
  return NextResponse.json(categories);
}


export async function PUT(req: any, res: any) {
  const { phoneNumber, id }: any = await req.json();

  const categories = await prisma.contact.update({
    data: {
      phoneNumber: Number(phoneNumber)
    },
    where: {
      id: {
        equals: id
      }
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

  // console.log('data', data)

  return NextResponse.json({
    status: 200,
  });
}
