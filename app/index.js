import { createRoot } from "react-dom/client";
import { App } from "./App";
import Lenis from 'lenis'

window.lenis = new Lenis();

function raf(time) {
    window.lenis.raf(time)
    requestAnimationFrame(raf)
}
  
requestAnimationFrame(raf)

const container = document.getElementById("app");
const root = createRoot(container)
root.render(<App />); 