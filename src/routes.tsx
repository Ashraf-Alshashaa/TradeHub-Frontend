import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Test = lazy(() => import("./pages/Test"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Products = lazy(() => import("./pages/products/Products"));
const Product = lazy(() => import("./pages/product/Product"));
const UserProfile = lazy(() => import("./pages/user-profile/User-profile"));
const Payment = lazy(() => import("./pages/Payment/Payment"))

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/payment",
    element: <Payment />
  }
];

export default routes;
