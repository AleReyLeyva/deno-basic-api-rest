import { Router } from "../deps.ts";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "./userController.ts";

const router = new Router();

export default router
  .get("/users", getAllUsers)
  .get("/user/:id", getUser)
  .post("/user", createUser)
  .delete("/user/:id", deleteUser)
  .put("/user/:id", updateUser);
