import Form from "./Form"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"
import Profile from "./Profile"

export default async function Header() {
  const session = await auth()

  if (!session?.user || !session?.user?.image) redirect("/authorization")

  return (
    <div className="flex justify-between align-center p-3 w-full bg-white">
      <Link href="/" className="font-lg font-[600]">Manager</Link>
      <Form />
      <Profile session={session} />
    </div>
  )
}