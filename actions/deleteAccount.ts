"use server"

import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"

export default async function deleteAccount() {
  await client.connect()

  const db = client.db("Manager")

  const session = await auth()

  if (!session?.user?.id) return console.log("Error")

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
