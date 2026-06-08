import type { ReactNode } from "react";
import NavLink from "../NavLink";

interface Props {
  children: ReactNode;
}

const AppShell = ({ children }: Props) => {
  return (
    <>
      <header>
        <h1>AutoMarket Pro</h1>
        <nav>
          <NavLink to="/vehicles">🚗 Vehicles</NavLink>
          <NavLink to="/vehicles/new">➕ Add Vehicle</NavLink>
        </nav>
      </header>
      <main>
        <p>Your one-stop solution for buying and selling vehicles.</p>
        {children}
      </main>
      <footer>
        <p>&copy; 2026 AutoMarket Pro. All rights reserved.</p>
      </footer>
    </>
  );
};

export default AppShell;
