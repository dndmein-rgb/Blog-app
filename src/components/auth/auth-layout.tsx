"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { PenTool } from "lucide-react";

function AuthLayout() {
    const [activeTab,setActiveTab]=useState('login')
    return ( 
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/20 px-4">
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <PenTool className="w-6 h-6 text-white" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Welcome to Inkwell</h1>
                <p className="text-muted-foreground">Share your stories with the world</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 shadow-lg p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6 w-full bg-muted">
                        <TabsTrigger value="login" className="data-[state=active]:bg-background">
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger value="register" className="data-[state=active]:bg-background">
                            Create Account
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='login'>
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value='register'>
                        <RegisterForm onSuccess={()=>setActiveTab('login')} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    </div> 
);
}

export default AuthLayout;
