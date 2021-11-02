//tsrafc=> tsc react arrow function shortcut!
import React from "react";
import "./todo-list.css";
interface DoneListProps {
  items: { id: string; text: string; done: boolean }[];
  deleteItems: (id: string) => void;
  updateItem: (id: string) => void;
}

const DoneList: React.FC<DoneListProps> = (props) => {
  return (
    <>
      <ul className="dones-list">
        {props.items.map((doneItem) => (
          <li key={doneItem.id}>
            <span>{doneItem.text}</span>
            <div className="right-side">
              <button onClick={() => props.updateItem(doneItem.id)}>
                Back
              </button>
              <button onClick={() => props.deleteItems(doneItem.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default DoneList;
