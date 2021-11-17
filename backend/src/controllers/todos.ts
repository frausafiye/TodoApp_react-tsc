import { Todo } from "../models/todo";
import {
  getDocumentsFromCollection,
  getSingleDocument,
  saveDocument,
  updateDocument,
  deleteDocument,
} from "../db";

import { RequestHandler } from "express";

export const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const text = (req.body as { text: string }).text;
    const userId = req["user"];
    const document = await saveDocument("todos", new Todo(text, false, userId));
    req.body.document = document;
    req.body.message = "new todo saved into db";
    next();
  } catch (error) {
    next(error);
  }
};

export const getTodos: RequestHandler = async (req, res, next) => {
  const userId = req["user"];
  try {
    const documents = await getDocumentsFromCollection("todos", userId);
    req.body.document = documents;
    req.body.message = "todos sent";
    next();
  } catch (error) {
    next(error);
  }
};
export const getSingleTodo: RequestHandler<{
  id: string;
}> = async (req, res, next) => {
  //
  try {
    const { id } = req.params;
    const document = await getSingleDocument("todos", { id: id });
    req.body.document = document;
    req.body.message = "todo found";
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateTodo: RequestHandler<{
  id: string;
}> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req["user"];
    const { text, done } = req.body as { text?: string; done?: boolean };
    const documentObj = {
      id: id,
      text: text,
      done: done,
      userID: userId,
    };
    const document = await updateDocument("todos", documentObj);
    req.body.document = document;
    req.body.message = "todo updated";
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteTodo: RequestHandler<{
  id: string;
}> = async (req, res, next) => {
  try {
    console.log("delete controller");
    const { id } = req.params;
    const document = await deleteDocument("todos", { id: id });
    req.body.document = document;
    req.body.message = "todo deleted";
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//import { Request, Response, NextFunction } from "express";
// export const createTodo = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};
