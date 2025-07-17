import { PredictionForm } from "@/components/prediction-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

function DashboardBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Abstract background"
        data-ai-hint="house blueprint"
        fill
        className="object-cover opacity-5"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto relative">
      <DashboardBackground />
        <Card className="relative overflow-hidden border-none shadow-none bg-transparent md:border md:shadow-sm md:bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">House Price Prediction</CardTitle>
            <CardDescription>Fill in the details below to get an AI-powered price estimate.</CardDescription>
          </CardHeader>
          <CardContent>
            <PredictionForm />
          </CardContent>
        </Card>
    </div>
  );
}
