"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"

export default async function addNewTask(
  boardId: string,
  listId: string,
  title: string,
) {
  await client.connect()

  const db = client.db("Manager")

  const session = await auth()

  if (!session?.user?.id) return console.log("Error")

  const taskCount = await db.collection("tasks").countDocuments({
    listId: new ObjectId(listId),
  })

  await db.collection("tasks").insertOne({
    listId: new ObjectId(listId),
    boardId: new ObjectId(boardId),
    userId: new ObjectId(session.user.id),
    title,
    completed: false,
    order: taskCount + 1,
  })
}
