"use client";

import { z } from "zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Input } from "../ui/input";
import { createPost } from "@/actions/post-actions";
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
        res = await createPost(formData);
        console.log(res);

        if (res.success) {
          toast("Post created successfully!");
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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title "
          {...register("title")} //<Input  //   name="title"//   onChange={someFn}  onBlur={someFn} ref={someRef}
          disabled={isPending}
        />
        {errors.title && (
          <p className="text-sm text-red-700">{errors.title.message} </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          disabled={isPending}
          placeholder="Enter a short description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-700">{errors.description.message} </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          className="min-h-62.5 resize-none"
          disabled={isPending}
          placeholder="Enter post content"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-sm text-red-700">{errors.content.message} </p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="mt-5 w-full">
        {isPending
          ? "Saving Post..."
          : isEditing
            ? "Update Post"
            : "Create Post"}
      </Button>
    </form>
  );
}

export default PostForm;
