import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./pages/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>
);
