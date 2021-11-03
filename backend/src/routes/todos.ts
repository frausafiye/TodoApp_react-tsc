import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todos";
const router = Router();
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getSingleTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
export default router;
