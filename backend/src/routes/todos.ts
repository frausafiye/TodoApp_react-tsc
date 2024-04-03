import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todos";
import middleware from "../middleware/authCheck";
import cors from "cors";
const router = Router();

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true,
};
router.post("/", middleware.decodetoken, createTodo);
router.get("/", middleware.decodetoken, getTodos);
router.get("/:id", middleware.decodetoken, getSingleTodo);
router.patch("/:id", middleware.decodetoken, updateTodo);
router.options("/*", cors(options));
router.delete("/:id", cors(options), middleware.decodetoken, deleteTodo);
export default router;
