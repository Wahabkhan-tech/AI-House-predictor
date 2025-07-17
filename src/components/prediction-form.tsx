"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const predictionFormSchema = z.object({
  bedrooms: z.number().min(1, "Must be at least 1").max(10, "Cannot exceed 10"),
  bathrooms: z.number().min(1, "Must be at least 1").max(10, "Cannot exceed 10"),
  squareFootage: z.coerce.number().min(500, "Must be at least 500 sq ft").max(10000, "Cannot exceed 10,000 sq ft"),
  zipCode: z.string().length(5, "Must be a 5-digit zip code"),
  propertyType: z.enum(["single_family", "condo", "townhouse"]),
  yearBuilt: z.date({
    required_error: "A year is required.",
  }),
});

export function PredictionForm() {
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof predictionFormSchema>>({
    resolver: zodResolver(predictionFormSchema),
    defaultValues: {
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1800,
      zipCode: "90210",
      propertyType: "single_family",
      yearBuilt: new Date("2000-01-01"),
    },
  });

  function onSubmit(values: z.infer<typeof predictionFormSchema>) {
    setLoading(true);
    setPrediction(null);
    const submissionValues = {
        ...values,
        yearBuilt: values.yearBuilt.getFullYear(),
    }
    console.log(submissionValues);

    // Simulate API call
    setTimeout(() => {
      const randomPrice = (Math.random() * (1500000 - 300000) + 300000).toFixed(0);
      setPrediction(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(randomPrice)));
      setLoading(false);
      toast({
        title: "Prediction Complete!",
        description: "Your estimated property value is ready.",
      });
    }, 2000);
  }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <FormField control={form.control} name="squareFootage" render={({ field }) => (
                        <FormItem><FormLabel>Square Footage</FormLabel><FormControl><Input type="number" placeholder="e.g., 1800" {...field} /></FormControl><FormMessage /></FormItem>
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
                </div>
                <div className="md:col-span-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Predicting..." : "Predict Price"}
                    </Button>
                </div>
            </form>
        </Form>
        {prediction && (
            <Card className="mt-8 animate-fade-in bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardHeader>
                    <CardTitle className="font-headline text-center gradient-text">Predicted Value</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-5xl font-bold tracking-tight text-primary">
                        {prediction}
                    </p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
