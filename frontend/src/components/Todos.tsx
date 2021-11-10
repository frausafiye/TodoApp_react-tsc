import React, { ReactElement, useContext, useEffect, useState } from "react";
import DoneList from "./DonesList";
import NewTodo from "./NewTodo";
import { requestSender } from "./requestSender";
import { Todo } from "./todo.model";
import TodoList from "./TodoList";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase-config";
import { AuthContext } from "../context/AuthContext";

interface Props {}

export default function Todos({}: Props): ReactElement {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([
    // { id: "t1", text: "Finish the project", done: true },
  ]);

  const todoItems = [...todos].filter((todoItem) => {
    return todoItem.done === false;
  });
  const doneItems = [...todos].filter((todoItem) => {
    return todoItem.done === true;
  });
  const fetchAndSetTodos = async () => {
    const response = await requestSender("todos", "get", {
      body: null,
      params: "",
    });
    if (response.success) {
      setTodos(response.document);
    } else {
      console.log(response.error);
    }
  };
  useEffect(() => {
    fetchAndSetTodos();
    onAuthStateChanged(auth, (returnUser) => {
      if (returnUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = returnUser.uid;
        console.log(returnUser);
        setCurrentUser(returnUser);
        // ...
      } else {
        // User is signed out
        console.log("user signed out");
      }
    });
  }, []);
  const addHandler = async (text: string) => {
    const response = await requestSender("todos", "post", {
      body: { text: text, done: false },
      params: "",
    });
    if (response.success) {
      fetchAndSetTodos();
    } else {
      console.log(response.error);
    }
  };
  const deleteHandler = async (id: string) => {
    const response = await requestSender("todos", "delete", {
      body: null,
      params: id,
    });
    if (response.success) {
      fetchAndSetTodos();
    } else {
      console.log(response.error);
    }
  };
  const updateHandler = async (id: string) => {
    const item = todos.find((element) => element.id === id)!;
    const newStatus = !item.done;
    const response = await requestSender("todos", "patch", {
      body: { text: item.text, done: newStatus },
      params: id,
    });
    if (response.success) {
      fetchAndSetTodos();
    } else {
      console.log(response.error);
    }
  };
  return (
    <>
      <NewTodo addItems={addHandler} />
      <TodoList
        items={todoItems}
        deleteItems={deleteHandler}
        updateItem={updateHandler}
      />
      <DoneList
        items={doneItems}
        deleteItems={deleteHandler}
        updateItem={updateHandler}
      />
    </>
  );
}
