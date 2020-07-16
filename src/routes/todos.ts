import { Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.post('/get-todos', getTodos);

router.post('/create-todo', createTodo);

router.patch('/update-todo', updateTodo);

router.delete('/delete-todo/:id', deleteTodo);

export default router;