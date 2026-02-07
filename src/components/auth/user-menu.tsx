"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "better-auth";
import { LogOut, PenSquare, UserIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: User;
}
function UserMenu({ user }: UserMenuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogOut=async()=>{
    setIsLoading(true);
    try {
        await signOut({
            fetchOptions:{
                onSuccess:()=>{
                    toast.success('See you next time!') 
                    router.refresh()
                }
            }
        })
    } catch (e) {
        console.log(e)
        toast.error('Failed to logout')
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">{getInitials(user?.name) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-3 p-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">{getInitials(user?.name) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/post/create">
            <PenSquare className="mr-2 h-4 w-4" />
            <span>Write Story</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogOut} disabled={isLoading}>
        <LogOut className="mr-2 h-4 w-4" />
         <span>{isLoading  ? 'Signing out...':'Sign Out'}</span>
      </DropdownMenuItem>
      </DropdownMenuContent>
     
    </DropdownMenu>
    
  );
}

export default UserMenu;
