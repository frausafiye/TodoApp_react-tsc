"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const authCheck_1 = __importDefault(require("../middleware/authCheck"));
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    credentials: true,
};
router.post("/", authCheck_1.default.decodetoken, todos_1.createTodo);
router.get("/", authCheck_1.default.decodetoken, todos_1.getTodos);
router.get("/:id", authCheck_1.default.decodetoken, todos_1.getSingleTodo);
router.patch("/:id", authCheck_1.default.decodetoken, todos_1.updateTodo);
router.options("/*", (0, cors_1.default)(options));
router.delete("/:id", (0, cors_1.default)(options), authCheck_1.default.decodetoken, todos_1.deleteTodo);
exports.default = router;
