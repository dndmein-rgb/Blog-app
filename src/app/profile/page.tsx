import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function ProfilePage() {
    const session =await auth.api.getSession({
        headers:await headers()
    })
    if(!session || !session.user){
        redirect('/')
    }
    return ( 
        <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
                        <p className="text-muted-foreground">Manage your account and stories</p>
                    </div>
                    <Button asChild className="gap-2">
                        <Link href={'/post/create'}>
                        <PlusCircle className="h-5 w-5" />
                        Write Story
                        </Link>
                    </Button>
                </div>
                <Card className="border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Account Information
                        </CardTitle>
                        <CardDescription>Your profile details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-border/30">
                                <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                                <p className="text-lg font-semibold mt-1">{session?.user.name}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Email Address</span>
                                <p className="text-lg font-semibold mt-1">{session?.user.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </main>
     );
}

export default ProfilePage;