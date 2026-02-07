import PostForm from "@/components/post/post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreatePost() {
    return ( 
        <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Write a New Story</h1>
                    <p className="text-muted-foreground">Share your thoughts and ideas with the world</p>
                </div>
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create Story</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PostForm />
                    </CardContent>
                </Card>
            </div>
        </main>
     );
}

export default CreatePost;