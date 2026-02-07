import { PostContentProps } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { formatDate } from "@/lib/utils"
import { Button } from "../ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react"
import DeletePostButton from "./delete-post-button"

function PostContent({post,isAuthor}:PostContentProps) {
  return (
    <article className="bg-card rounded-xl border border-border/50 shadow-lg overflow-hidden">
        <div className="p-8 md:p-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {post.title}
            </h1>
            <div className="flex items-center gap-4 pb-8 border-b border-border/30">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">By {post.author.name}</p>
                    <p className="text-sm text-muted-foreground/70">{formatDate(post.createdAt)}</p>
                </div>
            </div>
            <div className="prose prose-invert max-w-none my-8">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{post.description}</p>
                <div className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</div>
            </div>
        </div>
        {isAuthor && (
            <div className="px-8 md:px-10 pb-8 border-t border-border/30 flex gap-3">
                <Button asChild variant={'outline'} className="gap-2">
                    <Link href={`/post/edit/${post.slug}`}>
                    <Pencil className="h-4 w-4"/>
                    Edit
                    </Link>
                </Button>
                <DeletePostButton postId={post.id} />
            </div>
        )}
    </article>
  )
}

export default PostContent