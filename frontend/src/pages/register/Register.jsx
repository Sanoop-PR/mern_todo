import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
import OAuth from "../../components/OAuth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(res);
        console.log(data);
        setLoading(false);
        if (data.success === false) {
          toast.error('something wrong', {
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
          return;
        }
        toast.success('Register Successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    return (
      <div className="register_body">
        <section className="slider_body"><div class="slider-thumb"></div></section>
  
        <form className="register_section" onSubmit={handleSubmit}>
          <div className="input_div">
            <TextField className='textField' label="Username" variant="outlined" onChange={handleChange} id="username" type="text"/>
          </div>
          <div className="input_div">
            <TextField className='textField' variant="outlined" onChange={handleChange} id="email" type="email" label="Email" />
          </div>
          <div className="input_div">
            <TextField className='textField' variant="outlined" onChange={handleChange} id="password" type="password" label="Password" />
          </div>
          <Button type='submit' variant="contained" color="success" className="submit_btn">
            Register
          </Button>
          {/* <Divider align="center"><p>or</p></Divider> */}
            <OAuth />
            <p>
            Have an account?
            <Link to='/'>
            <span className='text-blue-500'>Login</span>
          </Link>
            </p>
        </form>
      </div>
    );
  }

export default Register