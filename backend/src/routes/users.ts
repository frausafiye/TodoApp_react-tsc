import { Router } from "express";
import {
  signUpNewUser,
  signInUser,
  signOutUser,
  getCurrentlySignedInUser,
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
router.post("/signup", signUpNewUser);
router.post("/signin", signInUser);
router.post("/signout", signOutUser);
router.get("/signeduser", getCurrentlySignedInUser);
router.post("/signup", signUpNewUser);
export default router;
