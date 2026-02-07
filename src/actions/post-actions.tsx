"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session?.user) {
      return {
        success: false,
        message: "You must be logged in to create a post",
      };
    }
    //get form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    //create slug from post title
    const slug = slugify(title);

    //check if slug already exists

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });
    if (existingPost) {
      return {
        success: false,
        message:
          " A post with the same title already exists! Please try with a different title.",
      };
    }
    const [newPost] = await  db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session?.user.id,
      })
      .returning();

      //revalidate the homepage to get latest posts
      revalidatePath('/')
      revalidatePath(`/post/${slug}`)
      revalidatePath('/profile')

      return {
        success:true,
        message:"Post created successfully",
        slug
      }
      
  } catch (error) {
    console.log(error)
    return{
        success:false,
        message:"Failed to create new post"
    }
  }
}

export async function updatePost(postId:number,formData: FormData){
  try {
      const session =await auth.api.getSession({
        headers:await headers()
      })
      if(!session ||!session?.user){
        return {
          success:false,
          message:"You must logged in to edit a post!"
        }
      }
        //get form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    const slug=slugify(title)
    const existingPost=await db.query.posts.findFirst({
      where:and(eq(posts.slug,slug),ne(posts.id,postId))
    })

    if(existingPost){
      return {
        success:false,
        message:"A post with this title already exists"
      }
    }

    const post=await db.query.posts.findFirst({
      where:eq(posts.id,postId)
    })

    if(post?.authorId !==session.user.id){
      return{
        success:false,
        message:"You can only edit your own posts!"
      }
    }
    await db.update(posts).set({
      title,description,content,slug,updatedAt:new Date()
    }).where(eq(posts.id,postId))
    //revalidate the homepage to get latest posts
      revalidatePath('/')
      revalidatePath(`/post/${slug}`)
      revalidatePath('/profile')

      return {
        success:true,
        message:"Post edited successfully",
        slug
      }
  } catch (error) {
     console.log(error)
    return {
      success:false,
      message:"Failed to update post"
    }
   
  }
}