"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function changeBoardBackground(
  boardId: string,
  background: string,
) {
  await client.connect()

  const db = client.db("Manager")

  await db
    .collection("boards")
    .findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: { image: background } },
    )
}
