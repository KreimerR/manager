"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function markTaskAsCompleted(taskId: string) {
  await client.connect()

  const db = client.db("Manager")

  await db
    .collection("tasks")
    .findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      { $set: { completed: true } },
    )
}
