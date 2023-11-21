import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  useRoutes
} from "react-router-dom";
import Home from "@/views/Home";
import Recommend from '@/views/Recommend'
import Mine from '@/views/Mine'

const MyRoutes:React.FC = ()=>{
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/recommend",
      element: <Recommend />,
    },
    {
      path:"/mine",
      element:<Mine />
    }
  ])
}




export default MyRoutes