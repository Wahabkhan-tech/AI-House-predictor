'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const features = [
    {
      title: 'Accurate Predictions',
      description: 'Leverage cutting-edge AI to get the most accurate price for any property.',
      icon: CheckCircle,
    },
    {
      title: 'Market Analysis',
      description: 'Understand market trends with our comprehensive data visualizations.',
      icon: CheckCircle,
    },
    {
      title: 'User-Friendly Interface',
      description: 'A clean, intuitive design makes navigating property data a breeze.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative w-full py-32 md:py-48 lg:py-56">
          <div className="absolute inset-0 -z-10 gradient-background opacity-70" />
          <div className="container mx-auto px-4 md:px-6 relative text-center">
            <div className="animate-fade-in space-y-4">
              <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl gradient-text">
                The Future of Real Estate is Here.
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
                AI House Price Predictor gives you the confidence to buy, sell, or invest by providing hyper-accurate valuations powered by artificial intelligence.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Get Started Free <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                 <Button asChild size="lg" variant="outline">
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Choose Us?
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Our platform is built on a foundation of data, accuracy, and user experience.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="animate-on-scroll transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 m-4 md:m-8 rounded-2xl overflow-hidden relative gradient-background opacity-90">
          <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-2 md:px-6">
            <div className="animate-on-scroll space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                How It Works
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Simple Inputs, Powerful Results
              </h2>
              <p className="text-muted-foreground">
                Just provide a few details about the property, and our AI model gets to work. It analyzes millions of data points, from market trends to neighborhood amenities, to deliver a precise valuation in seconds.
              </p>
              <Button asChild>
                <Link href="/dashboard">Try the Predictor</Link>
              </Button>
            </div>
            <div className="animate-on-scroll">
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Prediction dashboard"
                data-ai-hint="dashboard interface"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
