import dayjs from "dayjs";
import React, { useState } from "react";
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
const columns: IColumns<IInstrumentsData>[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Clicked",
    dataIndex: "clicked",
  },
  {
    title: "Distribution",
    dataIndex: "distribution",
  },
  {
    title: "Link",
    dataIndex: "link",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (row, _) => <>{dayjs(row).format("DD-MM-YYYY HH:mm")}</>,
  },
];
const InstrumentsPage = () => {
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
