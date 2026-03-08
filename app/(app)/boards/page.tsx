import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import client from "@/lib/db"
import RenderedBoards from "@/components/RenderedBoards"

export default async function Boards() {
  const session = await auth()

  if (!session?.user) redirect("/authorization")

  await client.connect()

  const db = client.db("Manager")

  const boardsRaw = await db.collection("boards").find({
    userId: session.user.email
  }).toArray()

  const boards = boardsRaw.map((board: any) => ({
    ...board,
    _id: board._id.toString(),
  }))

  return (
    <div className="flex justify-center">
      <div className="px-35">
        <h1 className="text-2xl font-bold py-5">My Boards:</h1>

        <RenderedBoards boards={boards} />
      </div>
    </div>
  )
}