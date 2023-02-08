import dayjs from "dayjs";
import React from "react";
import { IColumns } from "../../@types/columns.type";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomTable from "../../components/CustomTable/CustomTable";
import Search from "../../components/Search/Search";
import CustomSpinner from "../../components/UI/CustomSpinner/CustomSpinner";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppFetch from "../../hooks/useAppFetch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import { fetchOrders, fetchOrdersProps } from "../../redux/orders/asyncActions";
import { setOrdersPage } from "../../redux/orders/slice";
import { IOrdersData } from "../../redux/orders/types";

const columns: IColumns<IOrdersData>[] = [
  {
    title: "FIO",
    dataIndex: "FIO",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Status",
    dataIndex: "order_status",
  },
  {
    title: "Comment",
    dataIndex: "order_comment",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (row, _) => <>{dayjs(row).format("DD-MM-YYYY HH:mm")}</>,
  },
  {
    title: "Actions",
    dataIndex: "",
    render: (row, render) => <>Hello</>,
  },
];
const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, currentPage, total } = useAppSelector((state) => state.orders);
  const { searchParams } = useAppSelector((state) => state.searchParams);
  const { onChangePage } = useAppFetch<fetchOrdersProps>(
    (args) => dispatch(fetchOrders(args)),
    (page) => dispatch(setOrdersPage(page)),
    { page: currentPage, take: 10, ...searchParams },
    [currentPage]
  );
  if (isLoading && data.length < 1) {
    return <CustomSpinner />;
  }
  return (
    <>
      <Search onSearch={(args) => dispatch(fetchOrders({ page: 1, take: 10, ...args }))} />
      <CustomTable columns={columns} source={data} currentPage={currentPage} />
      <CustomPagination total={total} onChangePage={(page) => onChangePage(page)} currentPage={currentPage} />
    </>
  );
};

export default OrdersPage;
