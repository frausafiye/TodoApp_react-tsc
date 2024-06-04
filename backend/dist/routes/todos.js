"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const authCheck_1 = __importDefault(require("../middleware/authCheck"));
const router = express_1.Router();
router.post("/", authCheck_1.default.decodetoken, todos_1.createTodo);
router.get("/", authCheck_1.default.decodetoken, todos_1.getTodos);
// router.get("/:id", middleware.decodetoken, getSingleTodo);
router.patch("/:id", (req, res, next) => {
    console.log(req.params);
    next();
}, authCheck_1.default.decodetoken, todos_1.updateTodo);
// router.delete('/'
//   (req, res, next) => {
//     console.log(req.params);
//     next();
//   },
//   middleware.decodetoken,
//   deleteTodo
// );
router.delete("/:id", (req, res, next) => {
    console.log(req.params);
    next();
}, authCheck_1.default.decodetoken, todos_1.deleteTodo);
exports.default = router;
