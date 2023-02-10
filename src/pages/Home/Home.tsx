import React, { FC, ReactNode, useState } from "react";
import { IColumns } from "../../@types/columns.type";
import CustomTable from "../../components/CustomTable/CustomTable";
import MyMoneyInput from "../../components/Form/MyMoneyInput";
import Search from "../../components/Search/Search";
import MiniDrawer from "../../layouts/Main/Main";
import LeadPage from "../Leads/LeadsPage";

type DataType = {
  name: string;
  age: number;
  address: string;
};

const dataSource: DataType[] = [
  {
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns: IColumns<DataType>[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    render: (row, render?): React.ReactNode => <>{row}</>,
  },
];

const HomePage = () => {
  return <>Home </>;
};

export default HomePage;
