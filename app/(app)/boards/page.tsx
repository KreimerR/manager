import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import client from "@/lib/db"
import RenderedBoards from "@/components/RenderedBoards"
import { ObjectId } from "mongodb"
import { BoardDocumentType, BoardType } from "@/types"

export default async function Boards() {
  const session = await auth()

  if (!session?.user) redirect("/authorization")

  const db = client.db("manager-project")

  const boardsRaw = await db.collection<BoardDocumentType>("boards").find({
    userId: new ObjectId(session.user.id)
  }).toArray()

  const boards: BoardType[] = boardsRaw.map((board) => ({
    ...board,
    _id: board._id.toString(),
    userId: board.userId.toString(),
  }))

  return (
    <div className="flex justify-center">
      <div className="px-3 lg:px-35">
        <h1 className="text-2xl text-gray-700 font-bold py-5">My Boards:</h1>
        <RenderedBoards boards={boards} />
      </div>
    </div>
  )
}