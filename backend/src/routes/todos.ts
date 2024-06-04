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
// router.get("/:id", middleware.decodetoken, getSingleTodo);
router.patch(
  "/:id",
  (req, res, next) => {
    console.log(req.params);
    next();
  },
  middleware.decodetoken,
  updateTodo
);
// router.delete('/'
//   (req, res, next) => {
//     console.log(req.params);
//     next();
//   },
//   middleware.decodetoken,
//   deleteTodo
// );

router.delete(
  "/:id",
  (req, res, next) => {
    console.log(req.params);
    next();
  },
  middleware.decodetoken,
  deleteTodo
);
export default router;
