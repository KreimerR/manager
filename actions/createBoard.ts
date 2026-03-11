"use server"

import client from "@/lib/db"
import { auth } from "@/lib/auth"
import { ObjectId } from "mongodb"

export default async function createBoard(background: string, title: string) {
  await client.connect()

  const db = client.db("Manager")

  const session = await auth()

  if (!session?.user?.id) return console.log("Error")

  const result = await db.collection("boards").insertOne({
    userId: new ObjectId(session.user.id),
    title: title,
    image: background,
  })

  const boardId = result.insertedId

  await db.collection("lists").insertMany([
    {
      boardId,
      userId: new ObjectId(session.user.id),
      title: "To Do",
    },
    {
      boardId,
      userId: new ObjectId(session.user.id),
      title: "Doing",
    },
    { boardId, userId: new ObjectId(session.user.id), title: "Done" },
  ])

  return boardId.toString()
}
