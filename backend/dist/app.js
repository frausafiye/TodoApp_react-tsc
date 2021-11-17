"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
//import cors from "cors";
const body_parser_1 = require("body-parser");
const app = express_1.default();
const cookieParser = require("cookie-parser");
//firebase initializing
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyClwiiK8_WINLb7wjn7ld03UcNmLh5b1xc",
    authDomain: "deft-effect-295213.firebaseapp.com",
    projectId: "deft-effect-295213",
    storageBucket: "deft-effect-295213.appspot.com",
    messagingSenderId: "943567395085",
    appId: "1:943567395085:web:8e13067bc411a65262b844",
};
const firebase = app_1.initializeApp(firebaseConfig);
exports.db = firestore_1.getFirestore();
//routes
const todos_1 = __importDefault(require("./routes/todos"));
const error_1 = __importDefault(require("./error"));
//
//cors:
const setCors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  Accept,Content-Type, Access,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Vary", "Origin");
    next();
};
app.use(body_parser_1.json());
app.use(cookieParser());
//app.use(cors);
app.use(setCors);
app.use("/todos", todos_1.default);
app.use((req, res, next) => {
    //universal response sender:
    if (req.body.document) {
        if (req.body.document.success) {
            res.status(200).send({
                success: true,
                message: req.body.message,
                document: req.body.document.data,
            });
        }
        else {
            next(req.body.document.error);
        }
        //route not found:
    }
    else {
        let error = new error_1.default("no matching routes found", 404);
        next(error);
    }
});
//universal error handler:
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ success: false, message: err.message });
});
app.listen(4000);
