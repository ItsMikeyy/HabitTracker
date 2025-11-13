import { getUserSession } from "@/lib/session"
import Link from "next/link"
export default async function NavLinks() {
    const user = await getUserSession()
    return (
        <div className="hidden md:flex items-center gap-6">
        {user ? <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>: ""}
        <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
        <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
        <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
      </div>
    )
}