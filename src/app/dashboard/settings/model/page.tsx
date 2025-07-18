"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BrainCircuit } from "lucide-react"

export default function SettingsModelPage() {
  return (
     <Card>
      <CardHeader>
        <CardTitle>AI Model</CardTitle>
        <CardDescription>
          Choose the prediction model. More advanced models may be slower.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="standard" className="space-y-4">
          <Label className="flex items-center justify-between rounded-lg border p-4 cursor-pointer has-[:checked]:bg-primary/5 has-[:checked]:border-primary">
            <div className="flex items-center space-x-4">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Standard Model</p>
                <p className="text-sm text-muted-foreground">Balanced speed and accuracy.</p>
              </div>
            </div>
            <RadioGroupItem value="standard" id="standard" />
          </Label>
          <Label className="flex items-center justify-between rounded-lg border p-4 cursor-not-allowed opacity-50">
             <div className="flex items-center space-x-4">
               <BrainCircuit className="h-6 w-6" />
              <div>
                  <p className="font-semibold">Advanced Model</p>
                  <p className="text-sm text-muted-foreground">Higher accuracy, slightly slower.</p>
              </div>
            </div>
             <div className="text-xs font-semibold uppercase text-muted-foreground">Coming Soon</div>
          </Label>
          <Label className="flex items-center justify-between rounded-lg border p-4 cursor-not-allowed opacity-50">
             <div className="flex items-center space-x-4">
               <BrainCircuit className="h-6 w-6" />
              <div>
                <p className="font-semibold">Hyper-Tuned Model</p>
                <p className="text-sm text-muted-foreground">Maximum accuracy for professionals.</p>
              </div>
            </div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">Coming Soon</div>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
