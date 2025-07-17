"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Download, FileText, Home, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { PredictionForm, predictionFormSchema } from "@/components/prediction-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PdfReport } from "@/components/pdf-report";
import type { z } from "zod";

type Prediction = z.infer<typeof predictionFormSchema>;

type HistoryItem = {
  id: string;
  inputs: Prediction;
  prediction: string;
  timestamp: Date;
};

function DashboardBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 gradient-background" />
    </div>
  )
}

export default function DashboardPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState("new");
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);

  const handlePredictionComplete = (data: HistoryItem) => {
    setHistory(prev => [data, ...prev]);
    setActiveTab("history");
  };

  const generatePdf = async (item: HistoryItem) => {
    setPdfLoading(item.id);
    const reportElement = document.getElementById(`pdf-report-${item.id}`);
    if (!reportElement) {
        console.error("PDF report element not found!");
        setPdfLoading(null);
        return;
    }
    
    // Temporarily make it visible for capture
    reportElement.style.display = 'block';

    const canvas = await html2canvas(reportElement, {
        scale: 2, 
        useCORS: true, 
        backgroundColor: null
    });
    
    // Hide it again
    reportElement.style.display = 'none';

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`prediction-report-${item.id}.pdf`);
    setPdfLoading(null);
  };

  return (
    <div className="relative">
      <DashboardBackground />
      <div className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new">New Prediction</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
                <PredictionForm onPredictionComplete={handlePredictionComplete} />
            </TabsContent>
            <TabsContent value="history">
                <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Prediction History</CardTitle>
                        <CardDescription>View your past property value predictions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {history.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
                                <FileText className="h-12 w-12 text-muted-foreground/50" />
                                <h3 className="mt-4 text-lg font-semibold text-muted-foreground">No History Yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground/80">Make a prediction to see your history here.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-border">
                                {history.map(item => (
                                    <li key={item.id} className="flex items-center justify-between py-4">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-lg bg-primary/10 p-3">
                                                <Home className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{item.prediction}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.inputs.squareFootage} sqft &bull; {item.inputs.bedrooms} bed / {item.inputs.bathrooms} bath &bull; Zip: {item.inputs.zipCode}
                                                </p>
                                                <p className="text-xs text-muted-foreground/80">
                                                    {format(item.timestamp, "PPP p")}
                                                </p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            onClick={() => generatePdf(item)}
                                            disabled={pdfLoading === item.id}
                                        >
                                            {pdfLoading === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                                            <span className="sr-only">Download PDF</span>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
      {/* Hidden PDF templates */}
      <div className="absolute -z-10" style={{ left: '-9999px', top: '-9999px' }}>
        {history.map(item => (
          <div key={`pdf-${item.id}`} id={`pdf-report-${item.id}`} style={{ display: 'none', width: '600px' }}>
            <PdfReport item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
