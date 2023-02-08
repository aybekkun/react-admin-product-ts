export interface IColumns<T> {
  title: string;
  dataIndex?: string;
  render?: (row: keyof T, render: T) => React.ReactNode;
}
