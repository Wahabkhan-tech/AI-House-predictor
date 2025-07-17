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
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0 -z-10 gradient-background opacity-70" />
           <div className="container mx-auto px-4 md:px-6 relative">
             <div className="mx-auto max-w-3xl text-center animate-fade-in">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl gradient-text">
                    Get in Touch
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have questions? We'd love to hear from you. Fill out the form below.
                </p>
            </div>
           </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                        <h2 className="font-headline text-2xl font-semibold">Contact Information</h2>
                        <p className="text-muted-foreground">
                            Or, reach out to us via other channels. We're always happy to connect.
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
                                        <Input placeholder="Your Name" {...field} />
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
                                        <Input placeholder="your.email@example.com" {...field} />
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
                                        <Textarea placeholder="How can we help?" {...field} />
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
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
