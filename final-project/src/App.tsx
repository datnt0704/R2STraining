import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Colors from "./pages/Colors";
import Drawer from "./components/Drawer";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Drawer />,
    children: [
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/colors",
        element: <Colors />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
