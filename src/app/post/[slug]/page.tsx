import PostContent from "@/components/post/post-content";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

async function PostDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
    const {slug}=await params
    const post=await getPostBySlug(slug)

    const session=await auth.api.getSession({
        headers:await headers()
    })

    //get author info
     if(!post)return notFound();
    const isAuthor=session?.user?.id===post.authorId
   
  return <main className="py-10 max-w-4xl mx-auto">
    <PostContent post={post} isAuthor={isAuthor} />
  </main>;
}

export default PostDetailsPage;
