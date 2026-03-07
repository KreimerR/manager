import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import client from "@/lib/db"
import Link from "next/link"

export default async function Boards() {
  const session = await auth()

  if (!session?.user) redirect("/authorization")

  await client.connect()

  const db = client.db("Manager")

  const boards = await db.collection("boards").find({
    userId: session.user.email
  }).toArray()

  const renderedBoards = boards.map((el: any, index: number) => (
    <Link key={index} href={`/b/${el._id}`} className="flex flex-col shadow-lg rounded-b-2xl max-h-[150px] relative">
      <Image
        src={el.image}
        alt="Board background"
        width={500}
        height={500}
        className="object-cover rounded-t-2xl w-[300px] h-[100px] opacity-100 hover:opacity-0"
      />
      <div className="absolute top-0 left-0 w-full h-[100px] bg-black opacity-0 hover:opacity-30 rounded-t-2xl"></div>
      <div className="bg-white p-3 rounded-b-2xl">
        <h1>{el.title}</h1>
      </div>
    </Link>
  ))

  return (
    <div className="flex justify-center">
      <div className="w-[70vw]">
        <h1 className="text-2xl font-bold py-5">My Boards:</h1>

        <div className="flex gap-2 flex-wrap">
          {renderedBoards}
        </div>
      </div>
    </div>
  )
}