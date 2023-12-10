import React, { useEffect, useState } from "react";
import "./todoList.css";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import DialogEdit from "../edit/DialogEdit";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function TodoList() {
  // tab
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get username for local storage
  const { currentUser } = useSelector((state) => state.user);
  const { username } = currentUser;
  // dialog
  const [open, setOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);
  // dialog id
  const [tdDialog, setTdDialog] = useState({});
  //get a particular todo data to dialog for defaultValue of input tag
  const getTDDialog = (e) => {
    setTdDialog(e);
  };

  const fetchTodoList = async () => {
    try {
      const res = await fetch(`/api/todo/get_todo/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTodoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodoItem = async (id) => {
    try {
      const res = await fetch(`/api/todo/deleteTodo/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success !== false) {
        toast.success(data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  // close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // complete todo
  const handleComplete = async (id) => {
    try {
      const res = await fetch(`/api/todo/complete_todo/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, [todoList,handleComplete]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="To Do" value="1" />
              <Tab label="Completed" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {" "}
            {todoList.map(
              (t) =>
                t.complete === false && (
                    <div className="container">
                      <div className="check gridItem">
                        <Checkbox onClick={() => handleComplete(t._id)} />
                      </div>
                      <div className="title gridItem">
                        <h4>{t.title}</h4>
                      </div>
                      <div className="about gridItem">
                        <p>{t.about}</p>
                      </div>
                      <div className="time gridItem">
                        <p>{t.time}</p>
                      </div>
                      <div className="edit gridItem">
                        <box-icon
                          onClick={() => {
                            getTDDialog(t);
                            handleClickOpen();
                          }}
                          type="solid"
                          name="edit"
                        ></box-icon>
                      </div>
                      <div className="dlt gridItem">
                        <box-icon
                          onClick={() => handleDeleteTodoItem(t._id)}
                          type="solid"
                          name="trash"
                        ></box-icon>
                      </div>
                    </div>
                )
            )}
          </TabPanel>
          <TabPanel value="2">
            {" "}
            {todoList.map(
              (t) =>
                t.complete === true && (
                    <div className="container">
                      <div className="check gridItem">
                        <Checkbox onClick={() => handleComplete(t._id)} />
                      </div>
                      <div className="title gridItem">
                        <h4>{t.title}</h4>
                      </div>
                      <div className="about gridItem">
                        <p>{t.about}</p>
                      </div>
                      <div className="time gridItem">
                        <p>{t.time}</p>
                      </div>
                      <div className="edit gridItem">
                        <box-icon
                          onClick={() => {
                            getTDDialog(t);
                            handleClickOpen();
                          }}
                          type="solid"
                          name="edit"
                        ></box-icon>
                      </div>
                      <div className="dlt gridItem">
                        <box-icon
                          onClick={() => handleDeleteTodoItem(t._id)}
                          type="solid"
                          name="trash"
                        ></box-icon>
                      </div>
                    </div>
                )
            )}
          </TabPanel>
        </TabContext>
      </Box>

      <DialogEdit todo={tdDialog} open={open} onClose={handleClose} />
      <ToastContainer />
    </>
  );
}

export default TodoList;
