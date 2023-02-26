import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthLayout from "./layouts/AuthLayout";

import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Auth/Login";
import Brands from "./pages/Dashboard/brands/Brands";
import CreateBrand from "./pages/Dashboard/brands/CreateBrand";
import EditBrand from "./pages/Dashboard/brands/EditBrand";
import Cart from "./pages/Dashboard/cart/Cart";
import Categories from "./pages/Dashboard/categories/Categories";
import CreateCategory from "./pages/Dashboard/categories/CreateCategory";
import EditCategory from "./pages/Dashboard/categories/EditCategory";
import Dashboard from "./pages/Dashboard/dashboard/Dashboard";
import CreateProduct from "./pages/Dashboard/products/CreateProduct";
import EditProduct from "./pages/Dashboard/products/EditProduct";
import Products from "./pages/Dashboard/products/Products";
import CreatePurchase from "./pages/Dashboard/purchases/CreatePurchase";
import EditPurchase from "./pages/Dashboard/purchases/EditPurchase";
import Purchases from "./pages/Dashboard/purchases/Purchases";
import CreateSale from "./pages/Dashboard/sales/CreateSale";
import EditSale from "./pages/Dashboard/sales/EditSale";
import Sales from "./pages/Dashboard/sales/Sales";
import Settings from "./pages/Dashboard/settings/Settings";
import CreateSupplier from "./pages/Dashboard/suppliers/CreateSupplier";
import EditSupplier from "./pages/Dashboard/suppliers/EditSupplier";
import Suppliers from "./pages/Dashboard/suppliers/Suppliers";
import CreateUnit from "./pages/Dashboard/units/CreateUnit";
import EditUnit from "./pages/Dashboard/units/EditUnit";
import Units from "./pages/Dashboard/units/Units";
import CreateUser from "./pages/Dashboard/users/CreateUser";
import EditUser from "./pages/Dashboard/users/EditUser";
import Users from "./pages/Dashboard/users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          // products
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/create",
            element: <CreateProduct />,
          },
          {
            path: "/products/:id/edit",
            element: <EditProduct />,
          },
          // brands
          {
            path: "/brands",
            element: <Brands />,
          },
          {
            path: "/brands/create",
            element: <CreateBrand />,
          },
          {
            path: "/brands/:id/edit",
            element: <EditBrand />,
          },
          // categories
          {
            path: "/categories",
            element: <Categories />,
          },
          {
            path: "/categories/create",
            element: <CreateCategory />,
          },
          {
            path: "/categories/:id/edit",
            element: <EditCategory />,
          },
          // units
          {
            path: "/units",
            element: <Units />,
          },
          {
            path: "/units/create",
            element: <CreateUnit />,
          },
          {
            path: "/units/:id/edit",
            element: <EditUnit />,
          },
          // suppliers
          {
            path: "/suppliers",
            element: <Suppliers />,
          },
          {
            path: "/suppliers/create",
            element: <CreateSupplier />,
          },
          {
            path: "/suppliers/:id/edit",
            element: <EditSupplier />,
          },
          // users
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/users/create",
            element: <CreateUser />,
          },
          {
            path: "/users/:id/edit",
            element: <EditUser />,
          },
          // sales
          {
            path: "/sales",
            element: <Sales />,
          },
          {
            path: "/sales/create",
            element: <CreateSale />,
          },
          {
            path: "/sales/:id/edit",
            element: <EditSale />,
          },
          // purchases
          {
            path: "/purchases",
            element: <Purchases />,
          },
          {
            path: "/purchases/create",
            element: <CreatePurchase />,
          },
          {
            path: "/purchases/:id/edit",
            element: <EditPurchase />,
          },
          // cart
          {
            path: "/cart",
            element: <Cart />,
          },
          // settings
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "/login",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;
