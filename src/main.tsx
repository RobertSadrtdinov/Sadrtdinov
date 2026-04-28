import { createRoot } from "react-dom/client";
import App from "./app/App";
import ParticleTextEffectDemo from "./app/particle-text-effect-demo";
import CookieBanner from "./components/CookieBanner";
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
  