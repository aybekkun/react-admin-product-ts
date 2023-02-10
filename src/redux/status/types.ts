export interface IStatusState extends IStatus {
  isLoading: boolean;
  count: number;
  isSendingStatus: boolean;
  currentPage: number;
}

export interface IStatus {
  data: IStatusData[];
}

export interface IStatusData {
  id: number;
  name: string;
}
