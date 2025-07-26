import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './logo';

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <Logo layout="horizontal" />
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Home Worth AI. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
