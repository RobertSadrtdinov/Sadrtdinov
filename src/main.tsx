import { createRoot } from "react-dom/client";
import App from "./app/App";
import { CookieBanner } from "./app/components/cookie-banner";
import ParticleTextEffectDemo from "./app/particle-text-effect-demo";
import "./styles/index.css";

const demo = new URLSearchParams(window.location.search).get("demo");
const root = createRoot(document.getElementById("root")!);

if (demo === "particle") {
  root.render(
    <>
      <ParticleTextEffectDemo />
      <CookieBanner />
    </>
  );
} else {
  root.render(
    <>
      <App />
      <CookieBanner />
    </>
  );
}
  