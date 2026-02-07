"use client";

import { z } from "zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Input } from "../ui/input";
import { createPost, updatePost } from "@/actions/post-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be atleast 3 characters long")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(5, "Description must be atleast 5 characters long")
    .max(255, "Description must be less than 255 characters"),
  content: z.string().min(10, "Content must be atleast 10 characters long"),
});

interface PostFormProps {
  isEditing?: boolean;
  post?: {
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
  };
}

type PostFormValues = z.infer<typeof postSchema>;
function PostForm({ isEditing, post }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues:
      isEditing && post
        ? {
            title: post.title,
            content: post.content,
            description: post.description,
          }
        : {
            title: "",
            content: "",
            description: "",
          },
  });

  const onFormSubmit = async (data: PostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("description", data.description);

        let res;

        if(isEditing && post){
          res=await updatePost(post.id,formData)
        }
        else{
           res = await createPost(formData);
          }
          console.log("res",res);
       

        if (res.success) {
          toast(isEditing ?"Post edited Syccessfully" : "Post created successfully!");
          router.refresh();
          router.push("/");
        } else {
          toast(res.message);
        }
      } catch (error) {
        console.log(error);
        toast("Failed to create post!");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="space-y-3">
        <Label htmlFor="title" className="text-base font-semibold">Story Title</Label>
        <Input
          id="title"
          placeholder="Give your story a compelling title" 
          {...register("title")}
          disabled={isPending}
          className="h-12 text-lg"
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message} </p>
        )}
      </div>
      <div className="space-y-3">
        <Label htmlFor="description" className="text-base font-semibold">Summary</Label>
        <Textarea
          id="description"
          disabled={isPending}
          placeholder="Write a brief summary of your story"
          {...register("description")}
          className="min-h-24 resize-none"
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message} </p>
        )}
      </div>
      <div className="space-y-3">
        <Label htmlFor="content" className="text-base font-semibold">Story Content</Label>
        <Textarea
          id="content"
          className="min-h-96 resize-none font-mono text-sm"
          disabled={isPending}
          placeholder="Write your complete story here..."
          {...register("content")}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message} </p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="w-full h-11 text-base font-semibold">
        {isPending
          ? "Publishing..."
          : isEditing
            ? "Update Story"
            : "Publish Story"}
      </Button>
    </form>
  );
}

export default PostForm;
