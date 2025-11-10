"use client"

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    function handleSignOut() {
        signOut()
    }

    return (
        <button onClick={handleSignOut}>Sign out</button>
    )
}

