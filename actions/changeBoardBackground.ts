"use server"

import { auth } from "@/lib/auth"
import client from "@/lib/db"
import { ObjectId } from "mongodb"

export default async function changeBoardBackground(
  boardId: string,
  background: string,
) {
  const session = await auth()

  if (!session?.user?.id) throw new Error("Unauthorized")

  const db = client.db("manager-project")

  await db
    .collection("boards")
    .findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: { image: background } },
    )
}
