import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MyofascialMagazine from "./MyofascialMagazine";
import "./myofascial.css";

createRoot(document.getElementById("root")!).render(<StrictMode><MyofascialMagazine /></StrictMode>);
