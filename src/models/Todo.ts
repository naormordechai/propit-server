import { ObjectId } from "mongodb";

export interface ITodo {
    _id?: string | ObjectId;
    text: string;
    isCompleted: boolean;
    createdDate: Date;
};
