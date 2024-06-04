import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
interface TodoListProps {
  items: { id: string; text: string; done: boolean }[];
  deleteItems: (id: string) => void;
  updateItem: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <>
      <ul className="todo-list">
        {props.items.length === 0 && <li>No items</li>}
        {props.items.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <div className="right-side">
              <button onClick={props.updateItem.bind(null, todo.id)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button onClick={props.deleteItems.bind(null, todo.id)}>
                {/* instead of arrow func you can use bind like above. firs param=> this keyword, second=> param of the function */}
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default TodoList;
