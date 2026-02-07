"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long!"),
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be atleast 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps{
  onSuccess?:()=>void
}

function RegisterForm({onSuccess}:RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit=async(values:RegisterFormValues)=>{
    setIsLoading(true);
    try {
        const {error}=await signUp.email({
          name:values.name,
          email:values.email,
          password:values.password,
        })
        if(error){
          toast.error(error.message ?? "Failed to create account");
          return
        }
        toast.success("Account created! Signing you in...")
        if(onSuccess){
          onSuccess();
        }
    } catch (e) {
      console.log(e)
      toast.error("Something went wrong. Please try again.");
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} className="h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-10 font-medium" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
