"use server"

import { auth } from "@/lib/auth"
import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function deleteBoard(boardId: string) {
  const session = await auth()

  if (!session?.user?.id) throw new Error("Unauthorized")

  const db = client.db("manager-project")

  await db.collection("boards").findOneAndDelete({ _id: new ObjectId(boardId) })

  await db.collection("lists").deleteMany({ boardId: new ObjectId(boardId) })

  await db.collection("tasks").deleteMany({ boardId: new ObjectId(boardId) })
}
