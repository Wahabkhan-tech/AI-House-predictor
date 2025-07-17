import { PredictionForm } from "@/components/prediction-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function HouseVectorBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-5 dark:opacity-[0.03]">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute -right-1/4 -top-1/4 h-[150%] w-[150%] text-primary" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
        <Card className="relative overflow-hidden border-none shadow-none bg-transparent md:border md:shadow-sm md:bg-card">
          <div className="hidden md:block">
            <HouseVectorBackground />
          </div>
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
