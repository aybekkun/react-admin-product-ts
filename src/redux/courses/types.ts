export interface ICoursesState extends ICourses {
  currentPage: number;
  isLoading: boolean;
  count: number;
}

export interface ICourses {
  data: ICourseData[];
  total: number;
}
export interface ICourseData {
  id: number;
  name: string;
  description: string;
  clicked: number;
  createdAt: Date;
}
