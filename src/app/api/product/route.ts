import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from "uuid";
import { DBItemType } from "@/db";
import { FormFieldsEnum } from "@/app/dashboard/product";
import prisma from "@/utils/prisma";
import { Category } from "../category/route";
import { Prisma } from "@prisma/client";

export type ProductModel = {
  [FormFieldsEnum.id]: any;
  [FormFieldsEnum.name]: string;
  [FormFieldsEnum.slug]: string;
  [FormFieldsEnum.descriptions]: string[];
  [FormFieldsEnum.photo_main]: string;
  [FormFieldsEnum.photo_gallery]: string[];
  [FormFieldsEnum.categories]?: Category;
  [FormFieldsEnum.categoryId]?: string;
  [FormFieldsEnum.show]: boolean;
  [FormFieldsEnum.timer]: boolean;
  [FormFieldsEnum.orders]?: boolean;
  [FormFieldsEnum.endDate]?: Date;
};


export async function POST(req: any, res: any) {
  const data = await req.json();

  const resp = await prisma.product.create({
    data: {
      ...data,
      slug: decodeURIComponent(data.name.toLowerCase().replace(/\s+/g, '-')),
    },
  });

  return NextResponse.json(resp);
}

export async function GET() {
  const resp = await prisma.product.findMany({
    include: {
      orders: true,
      categories: {
        include: {
          tags: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return NextResponse.json(resp);
}

export async function DELETE(req: any, res: any) {
  const id = await req.json();



  await prisma.order.deleteMany({
    where: {
      productId: id
    }
  });

  
  const resp = await prisma.product.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    status: 200,
    data: resp
  });
}

export async function PUT(req: any, res: any) {
  const { id, ...otherValues } = await req.json();

  const categories = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      ...otherValues
      // tags: {
      //   connectOrCreate: tags.map((tag: string) => {
      //     return {
      //       where: { name: tag },
      //       create: { name: tag },
      //     };
      //   }),
      // }
    }
  });


  return NextResponse.json(categories)
}

// export async function PATCH(req: any, res: any) {
// 	const data = await req.json();

// 	newDb.read();

// 	let item = newDb.data.result.find((i: any) => {
// 		return i.id == data.id;
// 	}) as any;
// 	let index = newDb.data.result.indexOf(item);
// 	newDb.data.result[index] = data;
// 	newDb.write();
// 	// await db.push("/test1/nested/2","super test");
// 	await db.push("/test2/my/test/", 10, false);
// 	//   await db.push("/test3", {
// 	//     new:"cool",
// 	//     json: {
// 	//         important : 5
// 	//     }
// 	// }, false);

// 	return NextResponse.json({
// 		status: 200,
// 	});
// }
