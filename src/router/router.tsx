import { createElement, lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

const homePage = lazy(() => import("../pages/Main/Home"));
const menuPage = lazy(() => import("../pages/Main/Menu"));
const dishDetailsPage = lazy(() => import("../pages/Main/DishDetails"));
const cartPage = lazy(() => import("../pages/Main/Cart"));
const checkoutPage = lazy(() => import("../pages/Main/Checkout"));
const aboutPage = lazy(() => import("../pages/Main/About"));
const contactPage = lazy(() => import("../pages/Main/Contact"));
const trackOrderPage = lazy(() => import("../pages/Main/TrackOrder"));
const orderLookupPage = lazy(() => import("../pages/Main/OrderLookup"));
const notFoundPage = lazy(() => import("../pages/NotFound"));

function withRouteFallback(element: ReactNode) {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-[60vh] items-center justify-center"
          role="status"
          aria-live="polite"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sand border-t-olive" />
          <span className="sr-only">Loading page...</span>
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: withRouteFallback(createElement(homePage)),
      },
      {
        path: "/menu",
        element: withRouteFallback(createElement(menuPage)),
      },
      {
        path: "/menu/:id",
        element: withRouteFallback(createElement(dishDetailsPage)),
      },
      {
        path: "/cart",
        element: withRouteFallback(createElement(cartPage)),
      },
      {
        path: "/checkout",
        element: withRouteFallback(createElement(checkoutPage)),
      },
      {
        path: "/track-order",
        element: withRouteFallback(createElement(orderLookupPage)),
      },
      {
        path: "/track-order/:orderId",
        element: withRouteFallback(createElement(trackOrderPage)),
      },
      {
        path: "/about",
        element: withRouteFallback(createElement(aboutPage)),
      },
      {
        path: "/contact",
        element: withRouteFallback(createElement(contactPage)),
      },
    ],
  },
  {
    path: "*",
    element: withRouteFallback(createElement(notFoundPage)),
  },
]);
