import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/utils/prisma';

export type Category = {
  id: any;
  name: string;
  tags: string[];
}


export async function POST(req: any, res: any) {
  const { name, tags } = await req.json();

  // console.log('object', tags.map((t: string) => {
  //   return {
  //     name: t
  //   }
  // }))
  

  const categories = await prisma.categorie.create({
    data: {
      name,
      tags: {
        connectOrCreate: tags.map((tag: string) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      }
    }
  });

  // console.log('categories', categories)

  return NextResponse.json(categories)
}

export async function GET() {
  const categories = await prisma.categorie.findMany({
    include: {
      tags: true
    }
  })

  return NextResponse.json(categories)
}

export async function DELETE(req: any, res: any) {
  const data = await req.json();

  await prisma.categorie.delete({
    where: {
      id: data
    }
  })

  // console.log('data', data)

  return NextResponse.json({
    status: 200
  })
}