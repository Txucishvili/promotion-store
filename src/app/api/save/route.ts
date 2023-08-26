import { NextRequest, NextResponse } from "next/server";

import path, { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low, LowSync } from 'lowdb'
import { JSONFile, JSONFileSync } from 'lowdb/node'

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(process.cwd(), '/db/db.json')

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file)
const defaultData = { posts: [] }
// const db = new Low(adapter, defaultData)
const db = new LowSync(new JSONFileSync(file), {})

export async function POST(req: any, res: any) {
  const data = await req.json();
  // db.data.posts.push({ id: 1, title: 'lowdb is awesome' })
  await db.read()
  db.data.posts.push('some');
  await db.write();
  // Save to file
  // await db.write()
  console.log(data,process.cwd());

  return NextResponse.json({
    someData: true
  })
}