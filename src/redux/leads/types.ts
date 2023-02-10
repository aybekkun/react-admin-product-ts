import { IInstruments, IInstrumentsData } from './../instruments/types';
import { ICourseData } from './../courses/types';
export interface ILeadsState extends ILeads {
    currentPage: number,
    isLoading: boolean,
    count:number,
    isSendingComment: boolean,
}

export interface ILeads {
  data: ILeadsData[];
  total: number;
}

export interface ILeadsData {
  id: number;
  user_id: null | string;
  FIO: string;
  phone: string;
  status: number;
  comment: null | string;
  courseId: number | null;
  createdAt: Date;
  course: ICourseData | null;
  instrument: IInstrumentsData | null;
  real_status:{
    id:number,
    name:string
  }
}

