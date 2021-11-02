//tsrafc=> tsc react arrow function shortcut!
//or tscrfc => function component
import React from "react";
import "./todo-list.css";
interface TodoListProps {
  items: { id: string; text: string; done: boolean }[];
  deleteItems: (id: string) => void;
  updateItem: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <>
      <ul className="todo-list">
        {props.items.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <div className="right-side">
              <button onClick={props.updateItem.bind(null, todo.id)}>
                Done
              </button>
              <button onClick={props.deleteItems.bind(null, todo.id)}>
                {/* instead of arrow func you can use bind like above. firs param=> this keyword, second=> param of the function */}
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default TodoList;
