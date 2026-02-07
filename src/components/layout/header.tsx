"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";
import ThemeToggle from "../theme/theme-toggle";
import { PenTool } from "lucide-react";

function Header() {
  const {data:session,isPending}=useSession();
  const router = useRouter();
  
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={"/"} className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Inkwell</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
            </Link>
            {session?.user && (
              <Link
                href="/post/create"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Write
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="flex items-center gap-2">
           {isPending ? null:session?.user ? <UserMenu user={session?.user} /> :  <Button 
              onClick={() => router.push("/auth")}
              className="cursor-pointer"
            >Sign In</Button>}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
