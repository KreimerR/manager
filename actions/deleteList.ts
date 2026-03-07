"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function deleteList(listId: string) {
  await client.connect()

  const db = client.db("Manager")

  await db.collection("lists").findOneAndDelete({ _id: new ObjectId(listId) })
}
