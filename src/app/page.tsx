import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { Metadata } from "next";


export const metadata:Metadata={
  title:'Next.js Blog',
  description:'Next.js Blog'
}
export default async function Home() {
  const posts=await getAllPosts()
  
  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Discover Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore thoughtful articles, insights, and stories from writers around the world.
          </p>
        </div>
      {posts.length===0 ?
        <div className="text-center py-20">
          <div className="mb-4">
            <PenTool className="w-16 h-16 mx-auto text-muted-foreground/50" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No stories yet</h2>
          <p className="text-muted-foreground">Be the first to share your thoughts</p>
        </div>
        :<PostList posts={posts} />
    }
      </div> 
    </main>
  );
}

import { PenTool } from "lucide-react";
