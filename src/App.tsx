import React, { Suspense } from "react";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout/Layout";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Loading from "./components/Loading/Loading";

import {
  Home,
  About,
  Contact,
  CreateAccount,
  SignUp,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}