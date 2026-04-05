"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"

export default async function deleteAccount() {
  const db = client.db("manager-project")

  const session = await auth()

  if (!session?.user?.id) throw new Error("Unauthorized")

  await db.collection("users").deleteOne({ _id: new ObjectId(session.user.id) })

  await db
    .collection("accounts")
    .deleteOne({ userId: new ObjectId(session.user.id) })

  await db
    .collection("sessions")
    .deleteOne({ userId: new ObjectId(session.user.id) })

  await db
    .collection("boards")
    .deleteMany({ userId: new ObjectId(session.user.id) })

  await db
    .collection("lists")
    .deleteMany({ userId: new ObjectId(session.user.id) })

  await db
    .collection("tasks")
    .deleteMany({ userId: new ObjectId(session.user.id) })
}
