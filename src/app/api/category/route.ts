import { NextRequest, NextResponse } from "next/server";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { v4 as uuidv4 } from 'uuid';

export type CategoryItemData = {
  id: any;
  title: string;
  tags: string[];
}

export type CategoryItem = {
  id: any;
  data: CategoryItemData;
}

export type CategoryResponseType = {
  result: any;
  total: any;
}

const newDb = new CustomAsyncAdapter<CategoryResponseType>({ path: 'categories' });

export async function POST(req: any, res: any) {
  const data = await req.json();
  // db.data.posts.push({ id: 1, title: 'lowdb is awesome' })
  // await db.read();
  await newDb.read();
  newDb.data.result.push({
    id: uuidv4(),
    data
  });
  await newDb.write();
  // Save to file
  // await db.write()
  console.log(data, newDb);

  return NextResponse.json(newDb.data)
}

export async function GET() {
  await newDb.read();
  return NextResponse.json(newDb.data)
}

export async function DELETE(req: any, res: any) {
  const data = await req.json();

  newDb.read();

  const item = newDb.data.result.find((i: any) => {
    console.log('i', i.id == data);
    return i.id == data
  })
  console.log('i', item)
  newDb.data.result = newDb.data.result.filter((i: any) => {
    console.log('i', i.id == data);
    return i.id !== data
  })
   newDb.write();

  return NextResponse.json({
    status: 200
  })
}