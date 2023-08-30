import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from "uuid";
import { DBItemType } from "@/db";
import { FormFieldsEnum } from "@/app/dashboard/product";
import prisma from "@/utils/prisma";

export type ProductItem = {
	[FormFieldsEnum.id]: any;
	[FormFieldsEnum.title]: string;
	[FormFieldsEnum.category]: string;
	[FormFieldsEnum.categoryId]: string;
	[FormFieldsEnum.desc_1]: string;
	[FormFieldsEnum.desc_2]: string;
	[FormFieldsEnum.photo_main]: string;
	[FormFieldsEnum.photo_1]: string;
	[FormFieldsEnum.timer]: boolean;
	[FormFieldsEnum.show]: boolean;
	[FormFieldsEnum.bio]: string;
};

export type ProductResponse = {
	result: DBItemType<ProductItem>[];
	total: any;
};


export async function POST(req: any, res: any) {
	const data = await req.json();

	const resp = await prisma.product.create({
		data: data,
	});

	return NextResponse.json(resp);
}

export async function GET() {
	const resp = prisma.product.findMany({
		include: {
			categories: true,
		},
	});
	return NextResponse.json(resp);
}

export async function DELETE(req: any, res: any) {
	const id = await req.json();

	const resp = prisma.product.delete({
		where: {
			id,
		},
	});

	return NextResponse.json({
		status: 200,
    data: resp
	});
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
