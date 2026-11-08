import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Main/Home";
import NotFound from "../pages/NotFound";
import Menu from "../pages/Main/Menu";
import DishDetails from "../pages/Main/DishDetails";
import Cart from "../pages/Main/Cart";
import Checkout from "../pages/Main/Checkout";
import About from "../pages/Main/About";
import Contact from "../pages/Main/Contact";
import TrackOrder from "../pages/Main/TrackOrder";

export const router = createBrowserRouter([
   {
      element: <MainLayout/>,
      children:[
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/menu',
            element: <Menu/>
        },
        {
            path: '/menu/:id',
            element: <DishDetails/>
        },
        {
            path: '/cart',
            element: <Cart/>
        },
        {
            path: '/checkout',
            element: <Checkout/>
        },
        {
            path: '/track-order/:orderId',
            element: <TrackOrder/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/contact',
            element: <Contact/>
        }
      ]
   },
   {
      path: '*',
      element: <NotFound />
   }
])