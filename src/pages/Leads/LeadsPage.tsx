import dayjs from "dayjs";
import { IColumns } from "../../@types/columns.type";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomTable from "../../components/CustomTable/CustomTable";
import Search from "../../components/Search/Search";
import CustomSpinner from "../../components/UI/CustomSpinner/CustomSpinner";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppFetch from "../../hooks/useAppFetch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import { fetchLeads, fetchLeadsProps } from "../../redux/leads/asyncActions";
import { setLeadPage } from "../../redux/leads/slice";
import { ILeadsData } from "../../redux/leads/types";

const columns: IColumns<ILeadsData>[] = [
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
    dataIndex: "status",
  },
  {
    title: "Comment",
    dataIndex: "comment",
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

const LeadsPage = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.searchParams);
  const { data, isLoading, currentPage, total } = useAppSelector((state) => state.leads);
  const { onChangePage } = useAppFetch<fetchLeadsProps>(
    (args) => dispatch(fetchLeads(args)),
    (page) => dispatch(setLeadPage(page)),
    { page: currentPage, take: 10, ...searchParams },
    [currentPage]
  );

  if (isLoading && data.length < 1) {
    return <CustomSpinner />;
  }
  return (
    <>
      <Search onSearch={(args) => dispatch(fetchLeads({ page: 1, take: 10, ...args }))} />
      <CustomTable currentPage={currentPage} source={data} columns={columns} />
      <CustomPagination total={total} currentPage={currentPage} onChangePage={(page) => onChangePage(page)} />
    </>
  );
};

export default LeadsPage;
