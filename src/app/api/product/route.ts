import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from "uuid";
import { DBItemType } from "@/app/db";
import { FormFieldsEnum } from "@/app/dashboard/product";

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

const newDb = new CustomAsyncAdapter<ProductResponse>({ path: "products" });

export async function POST(req: any, res: any) {
	const data = await req.json();

	await newDb.read();
	newDb.data.result.push({
		id: uuidv4(),
		data,
	});

	await newDb.write();

	return NextResponse.json(newDb.data);
}

export async function GET() {
	await newDb.read();
	return NextResponse.json(newDb.data);
}

export async function DELETE(req: any, res: any) {
	const data = await req.json();

	newDb.read();

	const item = newDb.data.result.find((i: any) => {
		return i.id == data;
	});
	newDb.data.result = newDb.data.result.filter((i: any) => {
		console.log("i", i.id == data);
		return i.id !== data;
	});
	newDb.write();

	return NextResponse.json({
		status: 200,
	});
}

import { JsonDB, Config } from 'node-json-db';

// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new JsonDB(new Config("myDataBase", true, false, '/'));

// Pushing the data into the database
// With the wanted DataPath
// By default the push will override the old value


export async function PATCH(req: any, res: any) {
	const data = await req.json();

	newDb.read();
  
	let item = newDb.data.result.find((i: any) => {
    return i.id == data.id;
	}) as any;
  let index = newDb.data.result.indexOf(item);
	newDb.data.result[index] = data;
	newDb.write();
  // await db.push("/test1/nested/2","super test");
  await db.push("/test2/my/test/",10,false);
//   await db.push("/test3", {
//     new:"cool",
//     json: {
//         important : 5
//     }
// }, false);



	return NextResponse.json({
		status: 200,
	});
}
