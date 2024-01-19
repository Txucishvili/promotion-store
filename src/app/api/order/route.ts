import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/utils/prisma";
import { ProductModel } from "../product/route";

export type OrderModel = {
	id: string;
	fullName: string;
	phoneNumber: number;
	createdAt: Date;
	product: ProductModel;
};

export async function POST(req: any, res: any) {
	const { fullName, phoneNumber, productId,cityRegion } = await req.json();

  
	const resp = await prisma.order.create({
		data: {
			fullName,
			phoneNumber: Number(phoneNumber.replaceAll(' ', '')),
      cityRegion: {
        connect: {
          id: cityRegion
        }
      },
			product: {
				connect: {
					id: productId,
				},
			},
		},
    include: {
      product: {
        include: {
          categories: true
        }
      }
    }
	});

	return NextResponse.json(resp);
}

export async function GET() {
	const categories = await prisma.order.findMany({
		include: {
      cityRegion: {
        select: {
          name: true
        }
      },
			product: {
        include: {
          categories: true
        }
      },
		},
    orderBy: {
      createdAt: 'desc'
    }
	});

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
