import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";

ReactDOM.createRoot(document.getElementById("mountBox")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
