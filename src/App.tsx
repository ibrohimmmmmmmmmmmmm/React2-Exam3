import { Suspense } from "react";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout/Layout";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import {
  Home,
  About,
  Contact,
  CreateAccount,
  SignUp,
  ProductsCatalog,
  Account,
  Wishlist,
  ProductDetail,
  Cart,
  Checkout,
} from "./router/router";


export default function App() {

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },

        {
          path: "about",
          element: (
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          ),
        },

        {
          path: "contact",
          element: (
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          ),
        },

        {
          path: "signup",
          element: (
            <Suspense fallback={<Loading />}>
              <CreateAccount />
            </Suspense>
          ),
        },
        {
          path: "signup2",
          element: (
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "account",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Account />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductsCatalog />
            </Suspense>
          ),
        },
        {
          path: "products/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductsCatalog />
            </Suspense>
          ),
        },
        {
          path: "product-detail/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductDetail />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Checkout />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Wishlist />
              </Suspense>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}