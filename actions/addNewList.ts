"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function addNewList(boardId: any, title: string) {
  await client.connect()

  const db = client.db("Manager")

  const listCount = await db.collection("tasks").countDocuments({
    boardId: new ObjectId(boardId),
  })

  await db.collection("lists").insertOne({
    boardId: new ObjectId(boardId),
    title: title,
    order: listCount + 1,
  })
}
