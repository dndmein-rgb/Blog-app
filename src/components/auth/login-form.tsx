"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signIn } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
const loginSchema=z.object({
    email:z.string().email('Please enter a valid email address'),
    password:z.string().min(6,"Password must be atleast 6 characters long")
})
type LoginFormvalues=z.infer<typeof loginSchema>
function LoginForm() {
    const [isLoading,setIsLoading]=useState(false)
    const router=useRouter()

    //initialize form
    const form=useForm<LoginFormvalues>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:'',
            password:''
        }
})
const onLoginSubmit=async(values:LoginFormvalues)=>{
    setIsLoading(true);
    try {
        const {error}=await signIn.email({
            email:values.email,
            password:values.password,
            rememberMe:true
        })
        if(error){
            toast.error(error.message ?? 'Login Failed!')
            return 
        }
        toast.success('Welcome back!')
        router.push('/')
    } catch (e) {
        console.log(e)
        toast.error('An error occurred. Please try again.')
    }finally{
        setIsLoading(false)
    }
}
    return ( 
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onLoginSubmit)} className='space-y-5'>
            <FormField 
                control={form.control}
                name='email'
                render={({field})=>(
                    <FormItem>
                        <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                        <FormControl>
                            <Input placeholder='you@example.com' {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                 />
            <FormField 
                control={form.control}
                name='password'
                render={({field})=>(
                    <FormItem>
                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder='••••••••' {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                 />
                 <Button type="submit" className="w-full h-10 font-medium" disabng}>
                           {isLoading ? "Signing in..." : "Sign In"}
                 </Button>
            </form>
        </Form>
     );
}

export default LoginForm;