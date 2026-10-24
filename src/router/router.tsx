import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Main/Home";
import NotFound from "../pages/NotFound";
import Menu from "../pages/Main/Menu";

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
        }
      ]
   },
   {
      path: '*',
      element: <NotFound />
   }
])