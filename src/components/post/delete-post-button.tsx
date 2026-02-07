"use client";

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deletePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeletePostButton({ postId }: DeletePostButtonProps) {
    const [isDeleting,setIsDeleting]=useState(false);
    const router=useRouter()
    const handleDelete=async()=>{
        setIsDeleting(true);
        try {
            const res=await deletePost(postId)
            if(res.success){
                toast.success(res.message);
                router.push('/')
                router.refresh;
            }else{
                 toast.error(res.message)
            }
        } catch (error) {
           console.log(error)
           toast.error("Failed to delete story")
        }finally{
            setIsDeleting(false)
        }
    }
  return (
    <>
      <Button disabled={isDeleting} onClick={handleDelete} variant={"destructive"} className="gap-2">
        <Trash2 className="h-4 w-4" />
       {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}

export default DeletePostButton;
