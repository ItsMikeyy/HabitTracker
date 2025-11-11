import Link from "next/link"
import { Button } from "@/components/ui/button" 
import { getUserSession } from "@/lib/session"
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import SignOutButton from "../buttons/SignOutButton"

export default async function AuthButtons() {
    const user = await getUserSession()
    
    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link href="/api/auth/signin">
                    <Button variant="ghost" className="hidden sm:flex">
                        Log in
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button className="bg-gradient-to-r from-[rgba(155,42,74,1)] via-[rgba(162,87,199,1)] to-[rgba(83,206,237,1)] hover:opacity-90 transition-opacity">
                        Sign up
                    </Button>
                </Link>
            </div>
        )
    }

    // Get user initials for fallback
    function getInitials(name: string | null | undefined, email: string | null | undefined) {
        if (name) {
            return name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)
        }
        if (email) {
            return email[0].toUpperCase()
        }
        return 'U'
    }

    const initials = getInitials(user.name, user.email)
    const hasImage = user.image && user.image.trim() !== ""
    const userMenu = (
        <>
        {hasImage ? (
            <Image 
                alt={user.name || "User Avatar"} 
                src={user.image!} 
                width={32} 
                height={32} 
                className="rounded-full border-2 border-border"
                unoptimized
            />
        ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold border-2 border-border">
                {initials}
            </div>
        )}
        </>
    )

    
    return (
        <div className="flex items-center gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger> 
                    <div className="flex items-center gap-2">
                    {userMenu}
                        <span className="hidden sm:inline-block text-sm font-medium text-foreground">
                        {user.name || user.email}
                    </span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
            
        </div>
    )
}