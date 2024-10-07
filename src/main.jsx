import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import DoublePlayer from "./pages/DoublePlayer";
import SinglePlayer from "./pages/SinglePlayer";
import Developers from "./pages/Developers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/double",
    element: <DoublePlayer />,
  },
  {
    path: "/single",
    element: <SinglePlayer />,
  },
  {
    path: "/developers",
    element: <Developers />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
