import { Home, LucideProps } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, layout = 'vertical', ...props }: { className?: string, layout?: 'vertical' | 'horizontal' } & LucideProps) {
  
  if (layout === 'horizontal') {
    return (
       <Link href="/" className={cn("flex items-center gap-2 group", className)}>
         <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
              <Home className="h-6 w-6 text-primary" {...props} />
          </div>
          <span className="font-headline text-lg font-semibold leading-tight gradient-text">
              AI House Predictor
          </span>
       </Link>
    )
  }
  
  // Default to vertical layout for sidebar
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
        <div className="flex flex-col items-center gap-2 group-data-[collapsible=icon]:hidden">
             <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                <Home className="h-6 w-6 text-primary" {...props} />
            </div>
            <div className="flex flex-col items-center">
                <span className="font-headline text-lg font-semibold leading-tight gradient-text">
                    AI House
                </span>
                <span className="text-xs text-muted-foreground">Predictor</span>
            </div>
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
            <Home className="h-6 w-6 text-primary" {...props} />
        </div>
    </Link>
  );
}
