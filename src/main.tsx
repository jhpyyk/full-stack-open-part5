import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3003";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
