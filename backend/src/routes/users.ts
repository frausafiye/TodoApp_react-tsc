import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getSingleUser,
  updateUser,
} from "../controllers/users";
const router = Router();
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
