import React, { useEffect, useState } from "react";
import DoneList from "./components/DonesList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./components/todo.model";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { User } from "./components/user.model";
import { requestSender } from "./components/requestSender";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    // { id: "t1", text: "Finish the project", done: true },
  ]);
  const [user, setUser] = useState<User | null>();
  const todoItems = [...todos].filter((todoItem) => {
    return todoItem.done === false;
  });
  const doneItems = [...todos].filter((todoItem) => {
    return todoItem.done === true;
  });

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
  }, []);

  return (
    <div className="App">
      {/* {user ? ( */}
      <div>
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
      </div>
      {/* ) : ( */}
      <Login />
      {/* )} */}
    </div>
  );
};

export default App;
