import { User } from "../models/user";
import {
  getDocumentsFromCollection,
  getSingleDocument,
  saveDocument,
  updateDocument,
  deleteDocument,
} from "../db";
import { RequestHandler } from "express";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const getCurrentlySignedInUser: RequestHandler = async (
  req,
  res,
  next
) => {
  //
  try {
    //---Get the currently signed-in user------
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...eg user.toJSON() Returns a JSON-serializable representation of this object.
    } else {
      // No user is signed in.
    }

    //---Get a user's profile------
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.?????? from firebase???
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      console.log(user.getIdToken()); //Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.????? how to use it??
      const uid = user.uid; //you have the user id here!
    }
  } catch (error) {
    next(error);
  }
};

export const signUpNewUser: RequestHandler = async (req, res, next) => {
  //
  try {
    const { email, password } = req.body;
    console.log(email, password);
    //Sign up a user with an email address and password:
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.getIdToken().then((idToken) => {
          console.log(idToken);
          req.body.document = { success: true, data: { token: idToken } }; //send token back to client?//normally with res.cookie()
          req.body.message = "token sent";
          //signout from firebase here!otherwise firebase keeps user signed in.
          signOut(auth);
          next();
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        //   //  next() send the error message to error handler
        // }
        const err = new Error(errorMessage);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};
export const signInUser: RequestHandler = async (req, res, next) => {
  //
  try {
    const { email, password } = req.body;
    console.log(email, password);
    //Sign in a user with an email address and password:
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  } catch (error) {
    next(error);
  }
};

export const signOutUser: RequestHandler = async (req, res, next) => {
  //?????
  //
  try {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  //
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const document = await saveDocument(
      "users",
      new User(firstName, lastName, userName, email, password)
    );
    req.body.document = document;
    req.body.message = "new user saved into db";
    next();
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  //
  try {
    const documents = await getDocumentsFromCollection("users");
    req.body.document = documents;
    req.body.message = "users sent";
    next();
  } catch (error) {
    next(error);
  }
};
export const getSingleUser: RequestHandler<{
  id: string;
}> = async (req, res, next) => {
  //
  try {
    const { id } = req.params;
    const document = await getSingleDocument("users", { id: id });
    req.body.document = document;
    req.body.message = "user found";
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateUser: RequestHandler<{
  id: string;
}> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user: {
      firstName?: string;
      lastname?: string;
      userName?: string;
      email?: string;
      password?: string;
    } = req.body;
    const documentObj = {
      id: id,
      ...user,
    };
    const document = await updateDocument("users", documentObj);
    req.body.document = document;
    req.body.message = "user updated";
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteUser: RequestHandler<{
  id: string;
}> = async (req, res, next) => {
  //
  try {
    const { id } = req.params;
    const document = await deleteDocument("users", { id: id });
    req.body.document = document;
    req.body.message = "user deleted";
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
