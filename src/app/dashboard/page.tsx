import { PredictionForm } from "@/components/prediction-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 gradient-background" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="relative">
      <DashboardBackground />
      <div className="space-y-8">
         <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">House Price Prediction</CardTitle>
            <CardDescription>Fill in the details below to get an AI-powered price estimate.</CardDescription>
          </CardHeader>
          <CardContent>
            <PredictionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
