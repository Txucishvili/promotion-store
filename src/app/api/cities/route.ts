import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const data = await prisma.city.findMany({
    orderBy: {
      // createdAt: 'desc'
    }
  });

  return NextResponse.json(data);
}


export async function POST(req: any, res: any) {
  const { name } = await req.json();

  const resp = await prisma.city.create({
    data: {
      name
    }
  });

  return NextResponse.json(resp);
}

export async function PUT(req: any, res: any) {
  const { name, id } = await req.json();

  const resp = await prisma.city.update({
    where: {
      id: id
    },
    data: {
      name
    }
  });

  return NextResponse.json(resp);
}

export async function DELETE(req: any, res: any) {
  const { id } = await req.json();

  const resp = await prisma.city.delete({
    where: {
      id: id
    }
  });

  return NextResponse.json(resp);
}