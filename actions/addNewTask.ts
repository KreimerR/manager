"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"

export default async function addNewTask(
  boardId: string,
  listId: string,
  title: string,
) {
  const db = client.db("manager-project")

  const session = await auth()

  if (!session?.user?.id) throw new Error("Unauthorized")

  await db.collection("tasks").insertOne({
    listId: new ObjectId(listId),
    boardId: new ObjectId(boardId),
    userId: new ObjectId(session.user.id),
    title,
    completed: false,
  })
}
