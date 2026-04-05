"use server"

import { auth } from "@/lib/auth"
import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function editListTitle(listId: string, title: string) {
  const session = await auth()

  if (!session?.user?.id) throw new Error("Unauthorized")

  const db = client.db("manager-project")

  await db
    .collection("lists")
    .findOneAndUpdate({ _id: new ObjectId(listId) }, { $set: { title: title } })
}
