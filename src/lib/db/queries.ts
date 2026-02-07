import { desc } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";

//get all posts
export async function getAllPosts(){
    try {
        const AllPosts=await db.query.posts.findMany({
            orderBy:[desc(posts.createdAt)],
            with:{
                author:true
            }
        })
        return AllPosts
    } catch (error) {
        console.log(error);
        return [];
        
    }
}