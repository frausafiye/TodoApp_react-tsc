import React, { useRef } from "react";
import "./new-todo.css";

type NewTodoProps = {
  addItems: (text: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInputRef.current?.value) {
      const enteredText = textInputRef.current!.value;
      props.addItems(enteredText);
      textInputRef.current!.value = "";
    }
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text"></label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD</button>
    </form>
  );
};
export default NewTodo;
