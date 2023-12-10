import React, { useState } from 'react'
import './addTodo.css'
import {useSelector} from 'react-redux'
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";


function AddTodo() {

  // get username for local storage
  const {currentUser} = useSelector(state => state.user)
  const {username} = currentUser
  
  // const date = new Date()
  const formatDate = format(new Date(),"d-MMM-yy, H:mm a")

  const [formData, setFormData] = useState({username:username,title:'',about:'',time:formatDate});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);  
      const res = await fetch('/api/todo/add_todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      setFormData({ ...formData, title: "",about:"" });

      if (data.success!==false) {
        toast.success("successfully added", {
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
      if (data.success === false) {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setError(true);
        initializeData()
        return;
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
        <form className='addTodo_form' onSubmit={handleSubmit}>
            <div className='addTodo_div'>
                <input value={formData.title} onChange={handleChange} id='title' className='title_inp title' type="text" placeholder='Title...'/>
                <input value={formData.about} onChange={handleChange} id='about' className='title_inp about' type="text" placeholder='About...'/>
            </div>
            <button className='plus_btn' type='submit'>
                <box-icon name='plus' color='#0022ff' ></box-icon>
            </button>
        </form>
        <ToastContainer />

    </>
  )
} 

export default AddTodo