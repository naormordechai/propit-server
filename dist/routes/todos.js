"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
router.get('/', async (req, res, next) => {
    try {
        const result = await todos_1.getTodos();
        res.json(result);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
router.post('/', async (req, res) => {
    try {
        const todo = req.body;
        const result = await todos_1.createTodo(todo);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
router.patch('/', async (req, res, next) => {
    try {
        const todo = req.body;
        await todos_1.updateTodo(todo);
        res.status(200).json(true);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await todos_1.deleteTodo(id);
        res.status(200).json(true);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.default = router;
