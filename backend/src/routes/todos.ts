import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todos";
import middleware from "../middleware/authCheck";
const router = Router();

router.post("/", middleware.decodetoken, createTodo);
router.get("/", middleware.decodetoken, getTodos);
router.get("/:id", middleware.decodetoken, getSingleTodo);
router.patch("/:id", middleware.decodetoken, updateTodo);
router.post("/delete/:id", middleware.decodetoken, deleteTodo);
export default router;
