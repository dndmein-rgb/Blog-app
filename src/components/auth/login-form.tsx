"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
const loginSchema=z.object({
    email:z.string().email('Please enter a valid email address'),
    password:z.string().min(6,"Password must be atleast 6 characters long")
})
type LoginFormvalues=z.infer<typeof loginSchema>
function LoginForm() {
    const [isLoading,setIsLoading]=useState(false)

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
        console.log(values);
        
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
}
    return ( 
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onLoginSubmit)} className='space-y-4'>
            <FormField 
                control={form.control}
                name='email'
                render={({field})=>(
                    <FormItem>
                        <FormLabel >Email</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter your email' {...field} />
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
                        <FormLabel >Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder='Enter your password' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                 />
                 <Button type="submit" className="w-full " disabled={isLoading}>
                           {isLoading ? "Signing in..." : " Sign In"}
                         </Button>
            </form>
        </Form>
     );
}

export default LoginForm;