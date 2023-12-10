import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./edit.css";
import { ToastContainer, toast } from 'react-toastify';

function DialogEdit(props) {
  const { onClose, open, todo } = props;
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

    // close dialog
    const handleClose = () => {
        onClose(true);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/todo/todo_update/${todo._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      handleClose()
        if (data.success !== false) {
        toast.success(data, {
          position: "top-right",
          autoClose: 2000,
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



  useEffect(() => {}, [todo]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit}>
        <div className="dialog">
          <TextField
            defaultValue={todo.title}
            id="title"
            className="input"
            label="title"
            variant="outlined"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="dialog">
          <TextField
            onChange={handleChange}
            defaultValue={todo.about}
            id="about"
            className="input"
            label="about"
            variant="outlined"
          />
        </div>
        <div className="dialog btn">
          <Button onClick={handleClose} color="secondary">
            close
          </Button>
          <Button type="submit" variant="contained" color="success">
            update
          </Button>
        </div>
      </form>
      <ToastContainer />

    </Dialog>
  );
}

export default DialogEdit;
