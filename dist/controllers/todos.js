"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const mongodb_1 = require("mongodb");
exports.getTodos = async (req, res, next) => {
    try {
        const db = await mongo_1.connectToMongo();
        const criteria = req.body;
        let result = {};
        const todos = await db.collection('todos').find({ 'text': { $regex: criteria.term || '', '$options': 'i' } })
            .skip(criteria.offset)
            .limit(criteria.pageSize)
            .toArray();
        const count = await db.collection('todos').countDocuments({});
        ;
        result.todos = todos;
        result.count = count;
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};
exports.createTodo = async (req, res, next) => {
    try {
        const db = await mongo_1.connectToMongo();
        const todo = req.body;
        const addedTodo = await db.collection('todos').insertOne(todo);
        const result = addedTodo.ops[0];
        res.status(201).json(result);
    }
    catch (err) {
        res.status(201).json(err.message);
    }
};
exports.updateTodo = async (req, res, next) => {
    try {
        const db = await mongo_1.connectToMongo();
        const todo = req.body;
        todo._id = new mongodb_1.ObjectId(todo._id);
        await db.collection('todos').updateOne({ _id: todo._id }, { $set: { ...todo } });
        res.status(200).json(true);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};
exports.deleteTodo = async (req, res, next) => {
    try {
        const db = await mongo_1.connectToMongo();
        let id = req.params.id;
        id = new mongodb_1.ObjectId(id);
        await db.collection('todos').deleteOne({ _id: id });
        res.status(200).json(true);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};
