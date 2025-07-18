"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Moon, Sun, EyeOff } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

export default function SettingsAppearancePage() {
  const { setTheme, theme } = useTheme()
  const [showThemeToggle, setShowThemeToggle] = React.useState(true)

  return (
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
                {showThemeToggle && (
                    <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5" />
                        <Switch
                            id="theme-switch"
                            checked={theme === "dark"}
                            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                        />
                        <Moon className="h-5 w-5" />
                    </div>
                )}
                <Button variant="ghost" size="icon" onClick={() => setShowThemeToggle(!showThemeToggle)}>
                    <EyeOff className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}
