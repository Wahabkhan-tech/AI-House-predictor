// This file is intentionally left blank to simplify routing.
"use client";
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/ui/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "AI Model",
    href: "/dashboard/settings/model",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-2xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application settings.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  )
}
