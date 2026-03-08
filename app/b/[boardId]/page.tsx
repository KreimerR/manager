import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"
import BoardInfo from "@/components/BoardInfo"
import List from "@/components/List"

type Props = {
  params: Promise<{
    boardId: string
  }>
}

export default async function Board({ params }: Props) {
  const { boardId } = await params

  if (!boardId) return <h1>Board Id Error</h1>

  const session = await auth()

  if (!session?.user?.image) return <h1>Session Error</h1>

  await client.connect()

  const db = client.db("Manager")

  const userBoardRaw = await db.collection("boards").findOne({
    _id: new ObjectId(boardId)
  })

  if (!userBoardRaw) return <h1>User Board Error</h1>

  const userBoard = {
    ...userBoardRaw,
    _id: userBoardRaw._id.toString(),
    userId: userBoardRaw.userId?.toString()
  }

  const listsRaw = await db.collection("lists").find({
    boardId: new ObjectId(boardId)
  }).toArray()

  const lists = listsRaw.map((list: any) => ({
    ...list,
    _id: list._id.toString(),
    boardId: list.boardId.toString(),
  }))

  const tasksRaw = await db.collection("tasks").find({
    boardId: new ObjectId(boardId)
  }).toArray()

  const tasks = tasksRaw.map((task: any) => ({
    ...task,
    _id: task._id.toString(),
    listId: task.listId.toString(),
    boardId: task.boardId.toString(),
  }))

  return (
    <div className="w-full h-[calc(100vh-56px)] p-2 overflow-y-hidden">
      <div style={{ backgroundImage: `url(${userBoardRaw.image})` }} className="bg-cover bg-center w-full h-full rounded-2xl">
        <BoardInfo userBoard={userBoard} />

        <div className="h-full overflow-x-scroll">
          <List lists={lists} tasks={tasks} boardId={boardId} />
        </div>
      </div>
    </div>
  )
}