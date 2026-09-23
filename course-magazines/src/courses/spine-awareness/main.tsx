import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SpineMagazine from "./SpineMagazine";
import "./spine.css";

createRoot(document.getElementById("root")!).render(<StrictMode><SpineMagazine /></StrictMode>);
