"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function addNewTask(
  boardId: string,
  listId: string,
  title: string,
) {
  await client.connect()

  const db = client.db("Manager")

  const taskCount = await db.collection("tasks").countDocuments({
    listId: new ObjectId(listId),
  })

  await db.collection("tasks").insertOne({
    listId: new ObjectId(listId),
    boardId: new ObjectId(boardId),
    title,
    completed: false,
    order: taskCount + 1,
  })
}
