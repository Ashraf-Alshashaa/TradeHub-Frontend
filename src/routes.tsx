import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./components/protected-routes/ProtectedRoute";
import App from "./App";

const Test = lazy(() => import("./pages/Test"));
const Login = lazy(() => import("./pages/Login/Login"));
const Products = lazy(() => import("./pages/products/Products"));
const Product = lazy(() => import("./pages/product/Product"));
const UserProfile = lazy(() => import("./pages/user-profile/User-profile"));
const Payment = lazy(() => import("./pages/Payment/Payment"))

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "/payment",
        element: <Payment />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
