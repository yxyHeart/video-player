import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "@/views/Home";
import Recommend from '@/views/Recommend'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Recommend />,
    },
    {
        path: "/recommend",
        element: <Recommend />,
    },
  ]);

export default router