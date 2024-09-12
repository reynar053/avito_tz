import { Typography, IconButton, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useMemo, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import OrdersFilter from "../components/filters/OrdersFilter";
import OrderDetails from "../components/orders/OrderDetails";
import { PagingResponse, newPage } from "../fetching";
import { Order, OrderStatus } from "../types";
import SortIcon from "@mui/icons-material/Sort";

export default function OrderList() {
  const [fetchedOrders, setFetchedOrders] = useState<PagingResponse<Order>>(
    useLoaderData() as PagingResponse<Order>
  );
  const [isAscSorting, setIsAscSorting] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<number[]>(
    Object.values(OrderStatus)
  );

  const sortOrders = (a: Order, b: Order, asc: boolean) => {
    return asc ? a.total - b.total : b.total - a.total;
  };
  console.log(`Филдьтры: ${activeFilters}`);
  const filterHandler = (status: number, checked: boolean) => {
    setActiveFilters((prevFilters) => {
      if (checked) {
        return [...prevFilters, status];
      } else {
        return prevFilters.filter((id) => id !== status);
      }
    });
  };

  const filteredAndSortedOrders: Order[] = useMemo(() => {
    const filteredOrders = fetchedOrders.data.filter((order) =>
      activeFilters.includes(order.status)
    );

    return filteredOrders.sort((a, b) => sortOrders(a, b, isAscSorting));
  }, [isAscSorting, fetchedOrders, activeFilters]);

  const handlePageChange = (page: number) => {
    newPage(page, "orders", setFetchedOrders);
  };

  useEffect(() => {
    newPage(fetchedOrders.current, "orders", setFetchedOrders);
  }, []);

  return (
    <>
      <Typography variant="h3">Заказы</Typography>
      <OrdersFilter filterHandler={filterHandler} />
      <IconButton
        aria-label="Сортировка"
        onClick={() => setIsAscSorting(!isAscSorting)}
        style={{
          transition: "transform .3s",
          transform: `rotateX(${Number(isAscSorting) * 180}deg)`,
        }}
      >
        <SortIcon />
      </IconButton>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {filteredAndSortedOrders.map((order) => (
          <Grid key={order.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <OrderDetails order={order} key={order.id} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={fetchedOrders.pages}
        onChange={(_, page) => handlePageChange(page)}
      />
    </>
  );
}
