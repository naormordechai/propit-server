import { connectToMongo } from './mongo';
import { Db, InsertOneWriteOpResult, ObjectId } from 'mongodb';
import { ITodo } from '../models/Todo';

export const getTodos = async (): Promise<ITodo[]> => {
    const db: Db = await connectToMongo();
    return await db.collection('todos').find({}).toArray();
};

export const createTodo = async (todo: ITodo): Promise<ITodo> => {
    const db: Db = await connectToMongo();
    const addedTodo: InsertOneWriteOpResult<any> = await db.collection('todos').insertOne(todo);
    return addedTodo.ops[0];
};

export const updateTodo = async (todo: ITodo): Promise<void> => {
    const db: Db = await connectToMongo();
    todo._id = new ObjectId(todo._id);
    await db.collection('todos').updateOne({ _id: todo._id }, { $set: { ...todo } });
};

export const deleteTodo = async (todoId: string | ObjectId): Promise<void> => {
    const db: Db = await connectToMongo();
    todoId = new ObjectId(todoId);
    await db.collection('todos').deleteOne({ _id: todoId });
}