import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Root from "./pages/Root";
import ProductList from "./pages/ProductList";
import Categories from "./pages/Categories";
import Colors from "./pages/Colors";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/product",
        element: <ProductList />,
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
