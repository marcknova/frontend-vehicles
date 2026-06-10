import type { ReactNode } from "react";
import NavLink from "../NavLink";
import { ThemeToggle } from "../theme-toggle";

interface Props {
  children: ReactNode;
}

const AppShell = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-background border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-foreground font-bold text-xl">
              AutoMarket Pro
            </h1>

            <nav className="flex items-center gap-4">
              <NavLink to="/vehicles">🚗 Vehicles</NavLink>
              <NavLink to="/vehicles/new">➕ Add Vehicle</NavLink>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-muted-foreground mb-6">
          Your one-stop solution for buying and selling vehicles.
        </p>
        {children}
      </main>

      <footer className="border-t border-border bg-muted/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2026 AutoMarket Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;
