"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

function HouseVectorBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-5 dark:opacity-[0.03]">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute -right-1/4 -top-1/4 h-[150%] w-[150%] text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    </div>
  )
}

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container relative mx-auto my-24 max-w-4xl px-4 md:px-6">
            <HouseVectorBackground />
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl gradient-text">
                    Get in Touch
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have questions? We'd love to hear from you.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
                <div className="space-y-6">
                    <h2 className="font-headline text-2xl font-semibold">Contact Information</h2>
                    <p className="text-muted-foreground">
                        Fill out the form, or reach out to us via other channels.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Mail className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">contact@aihousepredictor.com</span>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="outline" size="icon" asChild>
                            <a href="#"><Twitter /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <a href="#"><Github /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <a href="#"><Linkedin /></a>
                        </Button>
                    </div>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <div className="p-px rounded-md bg-gradient-to-r from-blue-400 to-violet-500 focus-within:ring-2 focus-within:ring-ring">
                                    <Input placeholder="Your Name" {...field} className="bg-background border-none focus-visible:ring-0" />
                                </div>
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <div className="p-px rounded-md bg-gradient-to-r from-blue-400 to-violet-500 focus-within:ring-2 focus-within:ring-ring">
                                    <Input placeholder="your.email@example.com" {...field} className="bg-background border-none focus-visible:ring-0" />
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                <div className="p-px rounded-md bg-gradient-to-r from-blue-400 to-violet-500 focus-within:ring-2 focus-within:ring-ring">
                                    <Textarea placeholder="How can we help?" {...field} className="bg-background border-none focus-visible:ring-0" />
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
