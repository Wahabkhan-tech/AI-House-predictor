"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { BrainCircuit, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { toast } = useToast()
  const { setTheme, theme } = useTheme()

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application settings.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-switch" className="flex flex-col space-y-1">
              <span>Theme</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Select between light and dark mode.
              </span>
            </Label>
             <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5" />
              <Switch
                id="theme-switch"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
              <Moon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password here. Choose a strong one!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </CardContent>
      </Card>

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
    </div>
  )
}
