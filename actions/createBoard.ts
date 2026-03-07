"use server"

import client from "@/lib/db"
import { auth } from "@/lib/auth"

export default async function createBoard(background: string, title: string) {
  await client.connect()

  const db = client.db("Manager")

  const session = await auth()

  if (!session?.user?.email) return console.log("Error")

  const result = await db.collection("boards").insertOne({
    title: title,
    image: background,
    userId: session.user.email,
  })

  const boardId = result.insertedId

  await db.collection("lists").insertMany([
    { boardId, title: "To Do", order: 1 },
    { boardId, title: "Doing", order: 2 },
    { boardId, title: "Done", order: 3 },
  ])

  return boardId.toString()
}
