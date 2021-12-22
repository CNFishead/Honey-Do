import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, deleteTodo, updateTodo } from "../actions/todoActions";

// Image import

const TodoList = () => {
  // stuff
  const dispatch = useDispatch();
  // component state
  const [list, setList] = useState({
    name: "",
    todoItems: [],
  });
  // console.log(list);
  const [input, setInput] = useState("");

  // App State
  const { current } = useSelector((state) => state.todoSet);
  const { success: successDelete } = useSelector((state) => state.todoDelete);
  const { success: successUpdate } = useSelector((state) => state.todoUpdate);

  // Hooks
  useEffect(() => {
    if (current || successUpdate) {
      setList(current);
    } else {
      setList({
        name: "",
        todoItems: [],
      });
    }
  }, [dispatch, current, successDelete, successUpdate]);

  const handleChange = (e) => setInput(e.target.value);
  const deleteListHandler = (id) => {
    if (window.confirm("Are you Sure you wish to delete this list?")) {
      dispatch(deleteTodo(id));
    }
  };
  const addListItemHandler = (input) => {
    list.todoItems.push(input);
    dispatch(updateTodo(list));
  };

  const deleteItem = (id) => {
    const element = list.todoItems.indexOf(id);
    list.todoItems.splice(element, 1);
    dispatch(updateTodo(list));
  };

  return (
    <div
      className="todo-container"
      style={{ position: "relative", height: "100%" }}
    >
      {current ? (
        <>
          <div style={{ position: "relative", padding: "2%" }}>
            <h1 style={{ display: "inline" }}>{list.name}</h1>
            <Button
              className="todo-container-delete"
              variant="danger"
              onClick={() => deleteListHandler(list._id)}
            >
              <i className="far fa-trash-alt" />
            </Button>
          </div>

          <div className="form">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              name="lItem"
              placeholder="Add item here"
            />
            <button onClick={() => addListItemHandler(input)}>
              <span>Add</span>
            </button>
          </div>
          <div>
            <ul>
              {/* setup map array, for each item, in the array
          make a TodoItem component, pass an index value. */}
              {list.todoItems.map((Item, index) => (
                <div
                  // setup anonymous function, that will call
                  // ONLY when the div
                  // is clicked on.
                  key={index}
                  onClick={() => deleteItem(index)}
                >
                  {/* list item, gets text from props */}
                  <li>{Item}</li>
                </div>
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
            onClick={() =>
              dispatch(
                createTodo({
                  name: prompt("What Would you like to name the list?"),
                })
              )
            }
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
