import { connectToMongo } from './mongo';
import { Db, InsertOneWriteOpResult, ObjectId } from 'mongodb';
import { ITodo } from '../models/Todo';
import { RequestHandler } from 'express';
import { ITodoCriteria } from '../models/TodoCriteria';

export const getTodos: RequestHandler = async (req, res, next) => {
    try {
        const db: Db = await connectToMongo();
        const criteria: ITodoCriteria = req.body;
        let result: Partial<{ todos: ITodo[], count: number }> = {};
        const todos = await db.collection('todos').find({ 'text': { $regex: criteria.term || '', '$options': 'i' } })
            .skip(criteria.offset)
            .limit(criteria.pageSize)
            .toArray();

        const count = await db.collection('todos').countDocuments({});;
        result.todos = todos;
        result.count = count;
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const createTodo: RequestHandler = async (req, res, next) => {
    try {
        const db: Db = await connectToMongo();
        const todo: ITodo = req.body;
        const addedTodo: InsertOneWriteOpResult<any> = await db.collection('todos').insertOne(todo);
        const result = addedTodo.ops[0];
        res.status(201).json(result);
    } catch (err) {
        res.status(201).json(err.message);
    }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
    try {
        const db: Db = await connectToMongo();
        const todo: ITodo = req.body;
        todo._id = new ObjectId(todo._id);
        await db.collection('todos').updateOne({ _id: todo._id }, { $set: { ...todo } });
        res.status(200).json(true);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
    try {
        const db: Db = await connectToMongo();
        let id: string | ObjectId = req.params.id;
        id = new ObjectId(id);
        await db.collection('todos').deleteOne({ _id: id });
        res.status(200).json(true);
    } catch (err) {
        res.status(500).json(err.message);
    }
}