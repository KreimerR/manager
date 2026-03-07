"use client"

import { signIn } from "next-auth/react"

export default function Authorization() {
  return (
    <div>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  )
}