"use server"

import { auth } from "@/lib/auth"
import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function markTaskAsCompleted(taskId: string) {
  const session = await auth()

  if (!session?.user?.id) throw new Error("Unauthorized")

  const db = client.db("manager-project")

  await db
    .collection("tasks")
    .findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      { $set: { completed: true } },
    )
}
