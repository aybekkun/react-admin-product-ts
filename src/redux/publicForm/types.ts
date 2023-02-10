export interface IPublicFormState {
    courses: IPublicCourse[],
    isLoading: boolean,
    isSending: boolean,
}


export interface IPublicCourse{
    id:number;
    name:string;
}