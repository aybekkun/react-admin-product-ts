export interface IInstrumentsState extends IInstruments {
    currentPage: number,
    isLoading: boolean,
    count: number,
    isSending: boolean,
}
export interface IInstruments {
    data:  IInstrumentsData [];
    total: number;
}

export interface IInstrumentsData {
    id:           number;
    name:         string;
    link:         string;
    code:         string;
    price:        number;
    clicked:      number;
    type:         string;
    distribution: number;
    createdAt:    Date;
    deletedAt:    null;
}
