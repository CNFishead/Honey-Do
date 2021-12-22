import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, deleteTodo } from "../actions/todoActions";

// Components
import TodoItem from "./TodoItem";

// Image import

const TodoList = () => {
  // stuff
  const dispatch = useDispatch();
  // component state
  const [list, setList] = useState({
    name: "",
    todoItems: [],
  });
  const [input, setInput] = useState("");

  // App State
  const { current } = useSelector((state) => state.todoSet);
  const { success: successDelete } = useSelector((state) => state.todoDelete);

  // Hooks
  useEffect(() => {
    if (current) {
      setList(current);
    } else {
      setList({
        name: "",
        todoItems: [],
      });
    }
  }, [dispatch, current, successDelete]);

  const handleChange = (e) =>
    setList({ ...list, [e.target.name]: e.target.value });
  const deleteListHandler = (id) => {
    if (window.confirm("Are you Sure you wish to delete this list?")) {
      dispatch(deleteTodo(id));
    }
  };
  // const handleClick = () => {
  //   setItems((prevValues) => {
  //     return [...prevValues, input];
  //   });
  // };

  // const deleteItem = (id) => {
  //   // Get an array of previous items
  //   // use filter, to loop through all pieces of index
  //   setItems((prevItems) => {
  //     return prevItems.filter((item, index) => {
  //       // return all item indexes that dont match the id
  //       // that was passed to the deleteItem function
  //       return index !== id;
  //     });
  //   });
  // };

  return (
    <div
      className="todo-container"
      style={{ position: "relative", height: "100%" }}
    >
      {current ? (
        <>
          <div>
            <h1>{list.name}</h1>
          </div>
          <Button
            className="todo-container-delete"
            variant="danger"
            onClick={() => deleteListHandler(list._id)}
          >
            <i className="far fa-trash-alt" />
          </Button>

          <div className="form">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              name="lItem"
              placeholder="Add item here"
            />
            <button>
              <span>Add</span>
            </button>
          </div>
          <div>
            <ul>
              {/* setup map array, for each item, in the array
          make a TodoItem component, pass an index value. */}
              {list.todoItems.map((Item, index) => (
                // set todoItem that it passes down certain props
                // important prop, is the function passed down through
                // onCheck, and the id.
                <TodoItem
                  key={index}
                  id={index}
                  text={Item} /*onCheck={deleteItem}*/
                />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div style={{ height: "100%" }}>
          <Button
            className="btn-large"
            style={{
              borderRadius: "100%",
              padding: "5%",
              fontSize: "7rem",
              width: "50%",
              margin: "10%",
            }}
            onClick={() => dispatch(createTodo({ name: "Honey-Do List" }))}
            variant="success"
          >
            +
          </Button>
          <p style={{ fontSize: "3em" }}>Create new List?</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
