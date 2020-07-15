import { Router } from 'express';
import { ITodo } from '../models/Todo';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { json } from 'body-parser';

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const result: ITodo[] = await getTodos();
        res.json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const todo: ITodo = req.body;
        const result: ITodo = await createTodo(todo);
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.patch('/', async (req, res, next) => {
    try {
        const todo: ITodo = req.body;
        await updateTodo(todo);
        res.status(200).json(true);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTodo(id);
        res.status(200).json(true)
    } catch (err) {
        res.status(500).json(err.message);
    }

});

export default router;