import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Main/Home";
import NotFound from "../pages/NotFound";
import Menu from "../pages/Main/Menu";
import DishDetails from "../pages/Main/DishDetails";
import Cart from "../pages/Main/Cart";
import Checkout from "../pages/Main/Checkout";

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
        }
      ]
   },
   {
      path: '*',
      element: <NotFound />
   }
])