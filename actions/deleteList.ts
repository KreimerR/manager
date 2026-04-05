"use server"

import { auth } from "@/lib/auth"
import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function deleteList(listId: string) {
  const session = await auth()

  if (!session?.user?.id) throw new Error("Unauthorized")

  const db = client.db("manager-project")

  await db.collection("lists").findOneAndDelete({ _id: new ObjectId(listId) })

  await db.collection("tasks").deleteMany({ listId: new ObjectId(listId) })
}
