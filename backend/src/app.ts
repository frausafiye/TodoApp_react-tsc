import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
import { json } from "body-parser";
const app = express();
const cookieParser = require("cookie-parser");
app.use(json());
app.use(cookieParser());
// app.use(cors);

//firebase initializing
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyClwiiK8_WINLb7wjn7ld03UcNmLh5b1xc",
  authDomain: "deft-effect-295213.firebaseapp.com",
  projectId: "deft-effect-295213",
  storageBucket: "deft-effect-295213.appspot.com",
  messagingSenderId: "943567395085",
  appId: "1:943567395085:web:8e13067bc411a65262b844",
};
const firebase2 = initializeApp(firebaseConfig);
export const db = getFirestore();

//routes
import todoRoutes from "./routes/todos";
import userRoutes from "./routes/users";
import ErrorMiddleware from "./error";

//cors:
const setCors = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access,Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header("Access-Control-Expose-Headers", "*");
  res.header("Vary", "Origin");
  next();
};
app.use(setCors);

// app.all("*",(req: Request, res: Response, next: NextFunction)=>{
//   res.cookie() set cookie to all request???
// })

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  //universal response sender:
  if (req.body.document) {
    if (req.body.document.success) {
      res.status(201).send({
        success: true,
        message: req.body.message,
        document: req.body.document.data,
      });
    } else {
      next(req.body.document.error);
    }
    //route not found:
  } else {
    let error = new ErrorMiddleware("no matching routes found", 404);
    next(error);
  }
});

//universal error handler:
app.use(
  (err: ErrorMiddleware, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
);

app.listen(4000);
