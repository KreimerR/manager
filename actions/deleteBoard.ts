"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function deleteBoard(boardId: string) {
  await client.connect()

  const db = client.db("Manager")

  await db.collection("boards").findOneAndDelete({ _id: new ObjectId(boardId) })
}