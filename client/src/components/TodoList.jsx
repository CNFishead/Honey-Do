import React, { useState } from "react";

// Components
import TodoItem from "./TodoItem";

// Image import

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const handleClick = () => {
    setItems((prevValues) => {
      return [...prevValues, input];
    });
  };

  const deleteItem = (id) => {
    // Get an array of previous items
    // use filter, to loop through all pieces of index
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        // return all item indexes that dont match the id
        // that was passed to the deleteItem function
        return index !== id;
      });
    });
  };

  return (
    <div className="todo-container">
      <div>
        <h1>To do list Name</h1>
      </div>
      <div className="todo-container-delete">
        <i className="far fa-trash-alt" />
      </div>

      <div className="form">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          name="lItem"
          placeholder="Add item here"
        />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {/* setup map array, for each item, in the array
          make a TodoItem component, pass an index value. */}
          {items.map((Item, index) => (
            // set todoItem that it passes down certain props
            // important prop, is the function passed down through
            // onCheck, and the id.
            <TodoItem key={index} id={index} text={Item} onCheck={deleteItem} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
