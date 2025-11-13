import Link from "next/link";
import { Target } from "lucide-react";
import AuthButtons from "./AuthButtons";
import NavLinks from "./NavLinks";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Habits</span>
            </Link>
            <NavLinks />
           
          </div>

          {/* Auth Buttons */}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}
