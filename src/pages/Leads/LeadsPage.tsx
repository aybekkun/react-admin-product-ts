import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IColumns } from "../../@types/columns.type";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ChangeStatusUser from "../../components/CustomTable/components/ChangeStatusUser";
import CommentUser from "../../components/CustomTable/components/CommentUser";
import SendTgMesssage from "../../components/CustomTable/components/SendTgMesssage";
import CustomTable from "../../components/CustomTable/CustomTable";
import Search from "../../components/Search/Search";
import CustomSpinner from "../../components/UI/CustomSpinner/CustomSpinner";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppFetch from "../../hooks/useAppFetch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import { fetchLeads, fetchLeadsProps } from "../../redux/leads/asyncActions";
import { setLeadPage, setLeadsCount } from "../../redux/leads/slice";
import { ILeadsData } from "../../redux/leads/types";
import { fetchStatus } from "../../redux/status/asyncActions";
import DrawerLeads from "./components/DrawerLeads";
const LeadsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.searchParams);
  const { data, isLoading, currentPage, total, count } = useAppSelector((state) => state.leads);
  const columns: IColumns<ILeadsData>[] = [
    {
      title: t("fio"),
      dataIndex: "FIO",
    },
    {
      title: t("phone"),
      dataIndex: "phone",
    },
    {
      title: t("status"),
      dataIndex: "real__status",
      render: (row, render) => (
        <>
          <ChangeStatusUser userId={render.id} status={render.real_status} />
        </>
      ),
    },
    {
      title: t("comment"),
      dataIndex: "comment",
    },
    {
      title: t("source"),
      dataIndex: "",
      render:(row,render)=><>{render.instrument?.name}</>
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
        <Stack direction={"row"} spacing={2}>
          <CommentUser fetch={() => dispatch(setLeadsCount())} id={render.id} />
          {render.user_id && <SendTgMesssage userId={render.user_id} />}
        </Stack>
      ),
    },
  ];
  const { onChangePage } = useAppFetch<fetchLeadsProps>(
    (args) => {
      dispatch(fetchLeads(args));
      dispatch(fetchStatus());
    },
    (page) => dispatch(setLeadPage(page)),
    { page: currentPage, take: 10, ...searchParams },
    [currentPage, count]
  );
  const [open, setOpen] = useState(false);
  if (isLoading && data.length < 1) {
    return <CustomSpinner />;
  }
  return (
    <>
      <Stack direction={"row"} alignItems="flex-start">
        <Search onSearch={(args) => dispatch(fetchLeads({ page: 1, take: 10, ...args }))} />
        <IconButton onClick={()=>setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Stack>
      <CustomTable currentPage={currentPage} source={data} columns={columns} />
      <CustomPagination total={total} currentPage={currentPage} onChangePage={(page) => onChangePage(page)} />
      <DrawerLeads open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default LeadsPage;
