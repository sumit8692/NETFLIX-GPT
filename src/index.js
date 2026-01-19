import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="text-3xl font-bold">
      Hello React + Tailwind + Parcel
    </div>

  );
}

createRoot(document.getElementById("root")).render(<App />);
