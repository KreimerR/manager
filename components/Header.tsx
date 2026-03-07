import Form from "./Form"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"

export default async function Header() {
  const session = await auth()

  if (!session?.user || !session?.user?.image) redirect("/authorization")

  return (
    <div className="flex justify-between align-center p-3 w-full bg-white">
      <Link href="/" className="font-lg font-[600]">Manager</Link>
      <Form />
      <Image
        src={session.user.image}
        width={30}
        height={30}
        alt="User Icon"
        className="object-fit rounded-full w-max h-max hover:cursor-pointer"
      />
    </div>
  )
}