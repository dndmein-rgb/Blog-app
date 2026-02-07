import Container from "@/components/layout/container";
import PostForm from "@/components/post/post-form";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
    const {slug}=await params;
    const session=await auth.api.getSession({
        headers:await headers()
    })
    if(!session || !session?.user)redirect('/')

        const post=await getPostBySlug(slug)
        if(!post)return notFound()
            if(post.authorId!==session.user.id){
                redirect('/')
            }
    return ( 
        <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/20 py-16">
            <div className="max-w-3xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Edit Story</h1>
                    <p className="text-muted-foreground">Update your story details</p>
                </div>
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Edit Story</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PostForm isEditing={true} post={{
                            id:post.id,
                            title:post.title,
                            description:post.description,
                            content:post.content,
                            slug:post.content
                        }} />
                    </CardContent>
                </Card>
            </div>
        </main>
     );
}

export default EditPostPage;