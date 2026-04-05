import CreateButton from "./CreateButton"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"
import Image from "next/image"
import logo from "@/app/favicon.ico"
import Profile from "./Profile"

export default async function Header() {
  const session = await auth()

  if (!session?.user || !session?.user?.image) redirect("/authorization")

  return (
    <div className="flex justify-between align-center p-3 w-full bg-white">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={200}
          className="w-[40px] h-[40px]"
        />

        <span className="text-lg text-gray-700 font-bold">Manager</span>
      </Link>

      <div className="flex items-center gap-5">
        <CreateButton />
        <Profile session={session} />
      </div>
    </div>
  )
}