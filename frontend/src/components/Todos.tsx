import { ReactElement, useContext, useEffect, useState } from "react";
import DoneList from "./DonesList";
import NewTodo from "./NewTodo";
import { requestSender } from "./requestSender";
import { Todo } from "./todo.model";
import TodoList from "./TodoList";
import { AuthContext } from "../context/AuthContext";
import "./todo-list.css";

export default function Todos(): ReactElement {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([
    // { id: "t1", text: "Finish the project", done: true },
  ]);

  const todoItems = [...todos].filter((todoItem) => {
    return todoItem.done === false;
  });
  const doneItems = [...todos].filter((todoItem) => {
    return todoItem.done === true;
  });
  const fetchAndSetTodos = async (token: string) => {
    const response = await requestSender(
      "todos",
      "get",
      {
        body: null,
        params: "",
      },
      token
    );
    if (response.success) {
      setTodos(response.document);
    } else {
      console.log(response.error);
    }
  };

  const addHandler = async (text: string) => {
    const response = await requestSender(
      "todos",
      "post",
      {
        body: { text: text, done: false },
        params: "",
      },
      token
    );
    console.log(response);
    if (response.success) {
      fetchAndSetTodos(token);
    } else {
      console.log(response.error);
    }
  };
  const deleteHandler = async (id: string) => {
    const response = await requestSender(
      "todos/delete",
      "post", //a way around because of firestore restrictions
      {
        body: {},
        params: id,
      },
      token
    );
    if (response.success) {
      fetchAndSetTodos(token);
    } else {
      console.log(response.error);
    }
  };
  const updateHandler = async (id: string) => {
    const item = todos.find((element) => element.id === id)!;
    const newStatus = !item.done;
    const response = await requestSender(
      "todos",
      "patch",
      {
        body: { text: item.text, done: newStatus },
        params: id,
      },
      token
    );
    if (response.success) {
      fetchAndSetTodos(token);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAndSetTodos(token);
    }
  }, [token]);

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
