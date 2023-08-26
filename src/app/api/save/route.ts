import { NextRequest, NextResponse } from "next/server";

import path, { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low, LowSync } from 'lowdb'
import { JSONFile, JSONFileSync } from 'lowdb/node'
import { CustomAsyncAdapter } from "@/utils/db-utils";

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(process.cwd(), '/db/db.json')

// const db = new Low(adapter, defaultData)
const db = new LowSync(new JSONFileSync(file), {})
const newDb: any = new CustomAsyncAdapter({ path: 'categories' });

export async function POST(req: any, res: any) {
  const data = await req.json();
  // db.data.posts.push({ id: 1, title: 'lowdb is awesome' })
  // await db.read();
  await newDb.read();
  newDb.data.posts = [];
  newDb.data.posts.push('some');
  await newDb.write();
  // Save to file
  // await db.write()
  console.log(data, newDb);

  return NextResponse.json({
    someData: newDb.data
  })
}