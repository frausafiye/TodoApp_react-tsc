"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getUsers = exports.createUser = void 0;
const user_1 = require("../models/user");
const db_1 = require("../db");
const createUser = async (req, res, next) => {
    //
    try {
        const { firstName, lastName, userName, email, password } = req.body;
        const document = await db_1.saveDocument("users", new user_1.User(firstName, lastName, userName, email, password));
        req.body.document = document;
        req.body.message = "new user saved into db";
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getUsers = async (req, res, next) => {
    //
    try {
        const documents = await db_1.getDocumentsFromCollection("users");
        req.body.document = documents;
        req.body.message = "users sent";
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getSingleUser = async (req, res, next) => {
    //
    try {
        const { id } = req.params;
        const document = await db_1.getSingleDocument("users", { id: id });
        req.body.document = document;
        req.body.message = "user found";
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.getSingleUser = getSingleUser;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const documentObj = {
            id: id,
            ...user,
        };
        const document = await db_1.updateDocument("users", documentObj);
        req.body.document = document;
        req.body.message = "user updated";
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    //
    try {
        const { id } = req.params;
        const document = await db_1.deleteDocument("users", { id: id });
        req.body.document = document;
        req.body.message = "user deleted";
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.deleteUser = deleteUser;
