import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Main/Home";

export const router = createBrowserRouter([
   {
      element: <MainLayout/>,
      children:[
        {
            path: '/',
            element: <Home/>
        }
      ]
   }
])