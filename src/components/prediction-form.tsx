"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { predictHousePrice } from "@/ai/flows/predict-price-flow";
import type { PredictHousePriceInput } from "@/ai/schemas/house-price-schema";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

export const predictionFormSchema = z.object({
  bedrooms: z.number().min(1, "Must be at least 1").max(10, "Cannot exceed 10"),
  bathrooms: z.number().min(1, "Must be at least 1").max(10, "Cannot exceed 10"),
  squareFootage: z.coerce.number().min(500, "Must be at least 500 sq ft").max(10000, "Cannot exceed 10,000 sq ft"),
  lotSize: z.coerce.number().min(1000, "Must be at least 1000 sq ft").max(50000, "Cannot exceed 50,000 sq ft"),
  zipCode: z.string().length(5, "Must be a 5-digit zip code"),
  propertyType: z.enum(["single_family", "condo", "townhouse"]),
  yearBuilt: z.date({
    required_error: "A year is required.",
  }),
  hasGarage: z.boolean(),
  hasPool: z.boolean(),
});

type PredictionFormProps = {
  onPredictionComplete: (data: any) => void;
};

export function PredictionForm({ onPredictionComplete }: PredictionFormProps) {
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof predictionFormSchema>>({
    resolver: zodResolver(predictionFormSchema),
    defaultValues: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1800,
      lotSize: 5000,
      zipCode: "90210",
      propertyType: "single_family",
      yearBuilt: new Date("2000-01-01"),
      hasGarage: true,
      hasPool: false,
    },
  });

  async function onSubmit(values: z.infer<typeof predictionFormSchema>) {
    setLoading(true);
    setPrediction(null);
    
    const submissionValues: PredictHousePriceInput = {
        ...values,
        yearBuilt: values.yearBuilt.getFullYear(),
    };

    try {
      const result = await predictHousePrice(submissionValues);
      const formattedPrice = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        maximumFractionDigits: 0 
      }).format(result.predictedPrice);
      
      setPrediction(formattedPrice);
      onPredictionComplete({
        id: new Date().toISOString(),
        inputs: submissionValues,
        prediction: formattedPrice,
        timestamp: new Date(),
      });
      toast({
        title: "Prediction Complete!",
        description: "Your estimated property value is ready.",
      });
    } catch (error) {
      console.error("Prediction failed:", error);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: "Could not generate a price prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-0 shadow-none">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">House Price Prediction</CardTitle>
            <CardDescription>Fill in the details below to get an AI-powered price estimate.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <FormField control={form.control} name="squareFootage" render={({ field }) => (
                            <FormItem><FormLabel>Square Footage</FormLabel><FormControl><Input type="number" placeholder="e.g., 1800" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="lotSize" render={({ field }) => (
                            <FormItem><FormLabel>Lot Size (sq ft)</FormLabel><FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="zipCode" render={({ field }) => (
                            <FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input placeholder="e.g., 90210" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="yearBuilt" render={({ field }) => (
                            <FormItem className="flex flex-col"><FormLabel>Year Built</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "yyyy")
                                      ) : (
                                        <span>Pick a year</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    captionLayout="dropdown-buttons"
                                    fromYear={1800}
                                    toYear={new Date().getFullYear()}
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() || date < new Date("1800-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            <FormMessage /></FormItem>
                        )}/>
                    </div>
                    <div className="space-y-6">
                        <FormField control={form.control} name="propertyType" render={({ field }) => (
                            <FormItem><FormLabel>Property Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a property type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="single_family">Single Family</SelectItem><SelectItem value="condo">Condo</SelectItem><SelectItem value="townhouse">Townhouse</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="bedrooms" render={({ field }) => (
                            <FormItem><FormLabel>Bedrooms: {field.value}</FormLabel><FormControl><Slider min={1} max={10} step={1} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl></FormItem>
                        )}/>
                        <FormField control={form.control} name="bathrooms" render={({ field }) => (
                            <FormItem><FormLabel>Bathrooms: {field.value}</FormLabel><FormControl><Slider min={1} max={10} step={1} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl></FormItem>
                        )}/>
                        <div className="space-y-4 pt-4">
                           <FormField control={form.control} name="hasGarage" render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <FormLabel>Garage</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                              </FormItem>
                           )}/>
                            <FormField control={form.control} name="hasPool" render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <FormLabel>Pool</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                              </FormItem>
                           )}/>
                        </div>
                    </div>
                    </div>
                    <Separator className="my-8" />
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Predicting..." : "Predict Price"}
                    </Button>
                </form>
            </Form>
          </CardContent>
          {prediction && !loading && (
              <CardFooter>
                <Card className="w-full mt-4 animate-fade-in bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <CardHeader>
                        <CardTitle className="font-headline text-center gradient-text">Predicted Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-5xl font-bold tracking-tight text-primary">
                            {prediction}
                        </p>
                    </CardContent>
                </Card>
              </CardFooter>
          )}
      </Card>
    </div>
  );
}
