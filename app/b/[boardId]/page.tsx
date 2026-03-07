import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/lib/auth"
import Image from "next/image"
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

  const userBoard = await db.collection("boards").findOne({
    _id: new ObjectId(boardId)
  })

  if (!userBoard) return <h1>User Board Error</h1>

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
      <div style={{ backgroundImage: `url(${userBoard.image})` }} className="bg-cover bg-center w-full h-full rounded-2xl">
        <div className="p-5 relative flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-700 z-10">{userBoard.title}</h1>
          <Image
            src={session.user.image}
            alt="User Icon"
            width={500}
            height={500}
            className="object-cover w-[30px] h-[30px] rounded-full z-10"
          />
          <div className="bg-white opacity-30 absolute top-0 left-0 w-full h-full rounded-t-2xl"></div>
        </div>

        <div className="h-full overflow-x-scroll">
          <List lists={lists} tasks={tasks} boardId={boardId} />
        </div>
      </div>
    </div>
  )
}