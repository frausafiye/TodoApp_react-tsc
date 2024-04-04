import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
interface DoneListProps {
  items: { id: string; text: string; done: boolean }[];
  deleteItems: (id: string) => void;
  updateItem: (id: string) => void;
}

const DoneList: React.FC<DoneListProps> = (props) => {
  return (
    <>
      <ul className="dones-list">
        {props.items.length === 0 && <li>No items</li>}
        {props.items.map((doneItem) => (
          <li key={doneItem.id}>
            <span>{doneItem.text}</span>
            <div className="right-side">
              <button onClick={() => props.updateItem(doneItem.id)}>
                <FontAwesomeIcon icon={faUndoAlt} />
              </button>
              <button onClick={() => props.deleteItems(doneItem.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default DoneList;
