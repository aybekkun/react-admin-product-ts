import dayjs from "dayjs";
import { useState } from "react";
import { IColumns } from "../../@types/columns.type";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import TableDeleteItem from "../../components/CustomTable/components/TableDeleteItem";
import CustomTable from "../../components/CustomTable/CustomTable";
import CustomSpinner from "../../components/UI/CustomSpinner/CustomSpinner";
import MyAddButton from "../../components/UI/MyAddButton";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppFetch from "../../hooks/useAppFetch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import { fetchCourses, fetchCoursesProps } from "../../redux/courses/asyncActions";
import { ICourseData } from "../../redux/courses/types";
import { setOrdersPage } from "../../redux/orders/slice";
import DrawerCourses from "./components/DrawerCourses";
import { deleteCourse } from "../../redux/courses/asyncActions";
import { useTranslation } from "react-i18next";

const CoursesPage = () => {
  const { t } = useTranslation();
  const columns: IColumns<ICourseData>[] = [
    {
      title: t("courses"),
      dataIndex: "name",
    },
    {
      title: t("description"),
      dataIndex: "description",
    },
    {
      title: t("clicked"),
      dataIndex: "clicked",
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
          <TableDeleteItem id={render.id} color="error" onClick={() => dispatch(deleteCourse({ id: render.id }))} />
        </>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { data, currentPage, total, isLoading, count } = useAppSelector((state) => state.courses);

  const { onChangePage } = useAppFetch<fetchCoursesProps>(
    (args) => dispatch(fetchCourses(args)),
    (page) => dispatch(setOrdersPage(page)),
    { page: currentPage, take: 10 },
    [currentPage, count]
  );
  const [open, setOpen] = useState(false);
  const onFetch = () => {
    dispatch(fetchCourses({ page: 1, take: 10 }));
    setOpen(false);
  };

  if (isLoading && data.length < 1) {
    return <CustomSpinner />;
  }
  return (
    <>
      <MyAddButton onClick={() => setOpen(true)} />
      <CustomTable columns={columns} source={data} currentPage={currentPage} />
      <CustomPagination currentPage={currentPage} total={total} onChangePage={(page) => onChangePage(page)} />
      <DrawerCourses onFetch={onFetch} onClose={() => setOpen(false)} open={open} />
    </>
  );
};

export default CoursesPage;
