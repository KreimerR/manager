"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function editTaskTitle(taskId: string, title: string) {
  await client.connect()

  const db = client.db("Manager")

  await db
    .collection("tasks")
    .findOneAndUpdate({ _id: new ObjectId(taskId) }, { $set: { title: title } })
}
