"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getSingleTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const db_1 = require("../db");
const createTodo = async (req, res, next) => {
    //
    try {
        const text = req.body.text;
        const document = await db_1.saveDocument("todos", new todo_1.Todo(text, false));
        req.body.document = document;
        req.body.message = "new todo saved into db";
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.createTodo = createTodo;
const getTodos = async (req, res, next) => {
    //
    try {
        const documents = await db_1.getDocumentsFromCollection("todos");
        req.body.document = documents;
        req.body.message = "todos sent";
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.getTodos = getTodos;
const getSingleTodo = async (req, res, next) => {
    //
    try {
        const { id } = req.params;
        const document = await db_1.getSingleDocument("todos", { id: id });
        req.body.document = document;
        req.body.message = "todo found";
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.getSingleTodo = getSingleTodo;
const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { text, done } = req.body;
        const documentObj = {
            id: id,
            text: text,
            done: done,
        };
        const document = await db_1.updateDocument("todos", documentObj);
        req.body.document = document;
        req.body.message = "todo updated";
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res, next) => {
    //
    try {
        console.log("delete controller");
        const { id } = req.params;
        const document = await db_1.deleteDocument("todos", { id: id });
        req.body.document = document;
        req.body.message = "todo deleted";
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.deleteTodo = deleteTodo;
//import { Request, Response, NextFunction } from "express";
// export const createTodo = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};
