"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function editBoardTitle(boardId: string, title: string) {
  await client.connect()

  const db = client.db("Manager")

  await db
    .collection("boards")
    .findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: { title: title } },
    )
}
