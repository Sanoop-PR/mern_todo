import React, { useState } from "react";
import "./login.css";
import OAuth from "../../components/OAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        toast.error("please register", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("welcome", {
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
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  };

  return (
    <main>
      <section className="animate_body">
        <div class="animateme">
          <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
      <form onSubmit={handleSubmit} className="login_body">
        <div>
          <TextField
            label="Email"
            variant="outlined"
            id="email"
            type="email"
            className="p-3"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            label="Password"
            variant="outlined"
            id="password"
            type="password"
            className="p-3"
            onChange={handleChange}
          />
        </div>
        <Button variant="contained" color="success" type="submit">
          login
        </Button>
        <OAuth />
        <Divider orientation="horizontal" variant="middle" />
        <p>
          Do not have an account?
          <Link to="/register">
            <span className="text-red-500">Register</span>
          </Link>
        </p>
      </form>
      <ToastContainer />
    </main>
  );
}

export default Login;
