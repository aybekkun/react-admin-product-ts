import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { IColumns } from "../../@types/columns.type";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CommentUser from "../../components/CustomTable/components/CommentUser";
import SendTgMesssage from "../../components/CustomTable/components/SendTgMesssage";
import CustomTable from "../../components/CustomTable/CustomTable";
import Search from "../../components/Search/Search";
import CustomSpinner from "../../components/UI/CustomSpinner/CustomSpinner";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppFetch from "../../hooks/useAppFetch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import { fetchOrders, fetchOrdersProps } from "../../redux/orders/asyncActions";
import { setOrdersCount, setOrdersPage } from "../../redux/orders/slice";
import { IOrdersData } from "../../redux/orders/types";
import Stack from "@mui/material/Stack";
const OrdersPage = () => {
  const { t } = useTranslation();
  const columns: IColumns<IOrdersData>[] = [
    {
      title: t("fio"),
      dataIndex: "FIO",
    },
    {
      title: t("phone"),
      dataIndex: "phone",
    },

    {
      title: t("comment"),
      dataIndex: "",
      render: (row, render) => <>{render.lead.comment}</>,
    },
    {
      title: t("date"),
      dataIndex: "createdAt",
      render: (row, _) => <>{dayjs(row).format("DD-MM-YYYY HH:mm")}</>,
    },
    {
      title: t("actions"),
      dataIndex: "",
      render: (row, render) => (
        <>
          <Stack direction={"row"} spacing={2}>
            <CommentUser fetch={() => dispatch(setOrdersCount())} id={render.lead.id} />
            {render.lead.user_id && <SendTgMesssage userId={render.lead.user_id} />}
          </Stack>
        </>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const { data, isLoading, currentPage, total, count } = useAppSelector((state) => state.orders);
  const { searchParams } = useAppSelector((state) => state.searchParams);
  const { onChangePage } = useAppFetch<fetchOrdersProps>(
    (args) => dispatch(fetchOrders(args)),
    (page) => dispatch(setOrdersPage(page)),
    { page: currentPage, take: 10, ...searchParams },
    [currentPage, count]
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
