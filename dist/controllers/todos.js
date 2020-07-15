"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const mongodb_1 = require("mongodb");
exports.getTodos = async () => {
    const db = await mongo_1.connectToMongo();
    return await db.collection('todos').find({}).toArray();
};
exports.createTodo = async (todo) => {
    const db = await mongo_1.connectToMongo();
    const addedTodo = await db.collection('todos').insertOne(todo);
    return addedTodo.ops[0];
};
exports.updateTodo = async (todo) => {
    const db = await mongo_1.connectToMongo();
    todo._id = new mongodb_1.ObjectId(todo._id);
    await db.collection('todos').updateOne({ _id: todo._id }, { $set: { ...todo } });
};
exports.deleteTodo = async (todoId) => {
    const db = await mongo_1.connectToMongo();
    todoId = new mongodb_1.ObjectId(todoId);
    await db.collection('todos').deleteOne({ _id: todoId });
};
