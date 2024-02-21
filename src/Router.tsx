
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Booking } from "./pages/Booking";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { Menu } from "./pages/Menu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/menu",
        element: <Menu />,
      }
    ],
  },
  { path: "/admin", 
  element: <Admin /> 
},
]);
