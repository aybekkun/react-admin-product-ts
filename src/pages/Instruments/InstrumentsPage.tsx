import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IColumns } from "../../@types/columns.type";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomTable from "../../components/CustomTable/CustomTable";
import MyAddButton from "../../components/UI/MyAddButton";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppFetch from "../../hooks/useAppFetch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import { fetchInstruments } from "../../redux/instruments/asyncActions";
import { setInstrumentsPage } from "../../redux/instruments/slice";
import { IInstrumentsData } from "../../redux/instruments/types";
import DrawerInstruments from "./components/DrawerInstruments";

const InstrumentsPage = () => {
  const { t } = useTranslation();
  const columns: IColumns<IInstrumentsData>[] = [
    {
      title: t("name"),
      dataIndex: "name",
    },
    {
      title: t("price"),
      dataIndex: "price",
    },
    {
      title: t("clicked"),
      dataIndex: "clicked",
    },
    {
      title: t("distribution"),
      dataIndex: "distribution",
    },
    {
      title: t("link"),
      dataIndex: "link",
    },
    {
      title: t("date"),
      dataIndex: "createdAt",
      render: (row, _) => <>{dayjs(row).format("DD-MM-YYYY HH:mm")}</>,
    },
  ];
  const dispatch = useAppDispatch();
  const { data, isLoading, currentPage, total, count } = useAppSelector((state) => state.instruments);
  const { onChangePage } = useAppFetch(
    (args) => dispatch(fetchInstruments(args)),
    (page) => dispatch(setInstrumentsPage(page)),
    { page: currentPage, take: 10 },
    [count, currentPage, count]
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      <MyAddButton onClick={() => setOpen(true)} />
      <CustomTable columns={columns} currentPage={currentPage} source={data} />
      <CustomPagination currentPage={currentPage} total={total} onChangePage={(page) => onChangePage(page)} />
      <DrawerInstruments open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default InstrumentsPage;
