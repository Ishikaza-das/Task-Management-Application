import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
        <Toaster />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);