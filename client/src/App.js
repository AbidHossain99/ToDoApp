import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [listItem, setlistItem] = useState("");
  const [Items, setItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  /* add new items */
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/list", {
        list: listItem,
      });
      console.log(res);
      setlistItem("");
    } catch (err) {
      console.log(err);
    }
  };

  /* fetch data */
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/lists");
        setItems(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  /* delete data */
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/list/${id}`);
      const newListItems = Items.filter((list) => list._id !== id);
      setItems(newListItems);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* Update item */
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/list/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = Items.findIndex(
        (list) => list._id === isUpdating
      );
      const updatedItem = (Items[updatedItemIndex].list = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };

  /* update todo textfield html css */
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add New ToDo"
          onChange={(e) => {
            setlistItem(e.target.value);
          }}
          value={listItem}
        />
        <button type="Submit">Add</button>
      </form>
      <div className="todo-listItems">
        {Items.map((i) => (
          <div className="todo-item">
            {isUpdating === i._id ? (
              renderUpdateForm()
            ) : (
              <>
                <h4 className="item-content">{i.list}</h4>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(i._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(i._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
