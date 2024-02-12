
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Booking } from "./pages/Booking";
import { Contact } from "./pages/Contact";

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
    ],
  },
]);
