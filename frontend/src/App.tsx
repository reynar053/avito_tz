import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AdvertismentList from "./pages/AdvertismentList";
import Root from "./pages/Root";
import AdvertismentDetails from "./pages/AdvertismentDetails";
import ErrorPage from "./pages/ErrorPage";
import { fetchPagingData } from "./fetching";
import OrderList from "./pages/OrderList";

const BASE_URL = "http://localhost:3000";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Navigate to="/advertisements" replace />,
        },
        {
          path: "advertisements",
          element: <AdvertismentList />,
          loader: async () => {
            return fetchPagingData("advertisements");
          },
        },
        {
          path: "orders",
          element: <OrderList />,
          loader: async () => {
            return fetchPagingData("orders");
          },
        },
        {
          path: "advertisements/:advertismentId",
          element: <AdvertismentDetails />,
          loader: async ({ params }) => {
            const response = await fetch(
              `${BASE_URL}/advertisements/${params.advertismentId}`
            );
            if (response.ok) {
              return await response.json();
            } else {
              throw new Error(await response.text());
            }
          },
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
