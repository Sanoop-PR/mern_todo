import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addTodo, getTodo,deleteTodoItem ,updateTodo,isCompleteTodo} from '../controllers/todoController.js';

const router = express.Router();

router.post('/add_todo',addTodo);
router.post('/get_todo/:username',getTodo);
router.delete('/deleteTodo/:id',deleteTodoItem)
router.post('/todo_update/:id',updateTodo)
router.post('/complete_todo/:id',isCompleteTodo)
export default router;
