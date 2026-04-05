import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"
import BoardInfo from "@/components/BoardInfo"
import Lists from "@/components/Lists"

export default async function Board({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params

  if (!boardId) throw new Error("Board Id Error")

  const session = await auth()

  if (!session?.user?.image) throw new Error("Session Error")

  await client.connect()

  const db = client.db("manager-project")

  const userBoardRaw = await db.collection("boards").findOne({
    _id: new ObjectId(boardId)
  })

  if (!userBoardRaw) throw new Error("User Board Error")

  const userBoard = {
    ...userBoardRaw,
    _id: userBoardRaw._id.toString(),
    userId: userBoardRaw.userId?.toString()
  }

  const listsRaw = await db.collection("lists").find({
    boardId: new ObjectId(boardId),
  }).toArray()

  const lists = listsRaw.map((list: any) => ({
    ...list,
    _id: list._id.toString(),
    boardId: list.boardId.toString(),
    userId: list.userId.toString(),
  }))

  const tasksRaw = await db.collection("tasks").find({
    boardId: new ObjectId(boardId),
  }).toArray()

  const tasks = tasksRaw.map((task: any) => ({
    ...task,
    _id: task._id.toString(),
    listId: task.listId.toString(),
    boardId: task.boardId.toString(),
    userId: task.userId.toString(),
  }))

  return (
    <div className="w-full h-[calc(100vh-64px)] p-2 overflow-y-hidden">
      <div style={{ backgroundImage: `url(${userBoardRaw.image})` }} className="bg-cover bg-center w-full h-full rounded-2xl">
        <BoardInfo userBoard={userBoard} />

        <div className="h-full overflow-x-scroll">
          <Lists lists={lists} tasks={tasks} boardId={boardId} />
        </div>
      </div>
    </div>
  )
}