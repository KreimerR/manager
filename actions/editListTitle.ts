"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function editListTitle(listId: string, title: string) {
  await client.connect()

  const db = client.db("Manager")

  await db
    .collection("lists")
    .findOneAndUpdate({ _id: new ObjectId(listId) }, { $set: { title: title } })
}
