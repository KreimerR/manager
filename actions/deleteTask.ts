"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function deleteTask(taskId: string) {
  await client.connect()

  const db = client.db("Manager")

  await db.collection("tasks").findOneAndDelete({ _id: new ObjectId(taskId) })
}
