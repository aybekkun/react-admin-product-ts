import { ICourseData } from "../courses/types";
import {  ILeadsData } from "./../leads/types";
export interface IOrdersState extends IOrders {
  currentPage: number;
  isLoading: boolean;
  count: number;
  isSendingComment: boolean;
}

export interface IOrders {
  data: IOrdersData[];
  total: number;
}

export interface IOrdersData {
  id: number;
  FIO: string;
  phone: string;
  order_status: number;
  lead_course_id: string;
  order_comment: null | string;
  createdAt: Date;
  lead: ILeadsData;
  course: ICourseData;
}
