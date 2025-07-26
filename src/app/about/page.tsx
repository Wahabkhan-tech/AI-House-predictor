import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  { name: "Abdul Wahab", role: "Front End", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
  { name: "Muhammed Haseeb", role: "Back End", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
  { name: "Aimal Siddiqui", role: "Research & Documentation", avatar: "https://placehold.co/100x100.png", hint: "woman face" },
  { name: "Anher Siddiqui", role: "AI Model", avatar: "https://placehold.co/100x100.png", hint: "woman face" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 m-4 md:m-8 rounded-2xl overflow-hidden">
           <div className="absolute inset-0 -z-10 gradient-background opacity-70" />
           <div className="container mx-auto px-4 md:px-6 relative">
            <div className="mx-auto max-w-3xl text-center animate-fade-in">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl gradient-text">
                Our Mission
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                We are dedicated to revolutionizing the real estate industry by making property valuation transparent, accurate, and accessible to everyone. Our AI-driven platform empowers users with data-driven insights, fostering smarter decisions for buyers, sellers, and investors alike.
              </p>
            </div>
           </div>
        </section>

        <section className="py-20 md:py-32 m-4 md:m-8 rounded-2xl gradient-background opacity-90">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Meet the Team
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                The brilliant minds behind the innovation.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <Card key={member.name} className="animate-on-scroll text-center transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                  <CardHeader className="items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
                    <p className="text-sm text-primary">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
