import LogIn from "@/components/LogIn"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Authorization() {
  const session = await auth()

  if (!session?.user) return (
    <div>
      <LogIn />
    </div>
  )

  redirect("/boards")
}