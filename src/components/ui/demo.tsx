import React from "react";
import { Cpu } from "lucide-react";
import CybercoreBackground from "@/components/ui/cybercore-section-hero";

const CybercoreDemo: React.FC = () => (
  <section className="cybercore-demo">
    <CybercoreBackground beamCount={70} />

    <div className="content-wrapper">
      <header className="main-header">
        <div className="logo">
          <Cpu size={18} aria-hidden />
          <span>CYBERCORE</span>
        </div>
        <nav>
          <a href="#">Protocols</a>
          <a href="#">Network</a>
          <a href="#">Developers</a>
          <a href="#">Connect</a>
        </nav>
      </header>

      <main className="hero-section">
        <h1>Enter the Grid</h1>
        <p>
          Experience the next evolution of decentralized infrastructure, where
          data flows with unparalleled speed and security.
        </p>
        <button className="cta-button">Explore the Network</button>
      </main>
    </div>
  </section>
);

export default CybercoreDemo;
