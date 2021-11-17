"use strict";
// import { User } from "../models/user";
// import {
//   getDocumentsFromCollection,
//   getSingleDocument,
//   saveDocument,
//   updateDocument,
//   deleteDocument,
// } from "../db";
// import { RequestHandler } from "express";
// export const createUser: RequestHandler = async (req, res, next) => {
//   try {
//     const { firstName, lastName, userName, email, password } = req.body;
//     const document = await saveDocument(
//       "users",
//       new User(firstName, lastName, userName, email, password)
//     );
//     req.body.document = document;
//     req.body.message = "new user saved into db";
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
// export const getUsers: RequestHandler = async (req, res, next) => {
//   //
//   try {
//     const documents = await getDocumentsFromCollection("users");
//     req.body.document = documents;
//     req.body.message = "users sent";
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
// export const getSingleUser: RequestHandler<{
//   id: string;
// }> = async (req, res, next) => {
//   //
//   try {
//     const { id } = req.params;
//     const document = await getSingleDocument("users", { id: id });
//     req.body.document = document;
//     req.body.message = "user found";
//     next();
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
// export const updateUser: RequestHandler<{
//   id: string;
// }> = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user: {
//       firstName?: string;
//       lastname?: string;
//       userName?: string;
//       email?: string;
//       password?: string;
//     } = req.body;
//     const documentObj = {
//       id: id,
//       ...user,
//     };
//     const document = await updateDocument("users", documentObj);
//     req.body.document = document;
//     req.body.message = "user updated";
//     next();
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
// export const deleteUser: RequestHandler<{
//   id: string;
// }> = async (req, res, next) => {
//   //
//   try {
//     const { id } = req.params;
//     const document = await deleteDocument("users", { id: id });
//     req.body.document = document;
//     req.body.message = "user deleted";
//     next();
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
