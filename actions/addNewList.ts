"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"

export default async function addNewList(boardId: any, title: string) {
  await client.connect()

  const db = client.db("Manager")

  const session = await auth()

  if (!session?.user?.id) return console.log("Error")

  const listCount = await db.collection("tasks").countDocuments({
    boardId: new ObjectId(boardId),
  })

  await db.collection("lists").insertOne({
    boardId: new ObjectId(boardId),
    userId: new ObjectId(session.user.id),
    title: title,
    order: listCount + 1,
  })
}
