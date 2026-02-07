import { PostCardProps } from "@/lib/types";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post.slug}`}>
      <article className="group h-full flex flex-col p-6 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:bg-card/80">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {post.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">{post.author.name}</span>
            <span className="text-xs text-muted-foreground/70">{formatDate(post.createdAt)}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
