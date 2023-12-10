import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import logo from "../../assets/todo-logo.png";
import TextField from "@mui/material/TextField";
import "./profile.css";
import { Stack } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../../redux/user/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate()
  

  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    console.log(image); //...
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.log(error); //...
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(formData);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success('Successfully updated', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate('/home')        
      }, 3000);
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  return (
    <>
      <header>
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ flexGrow: 2 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                className="profile_logo"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  onClick={()=>navigate('/home')}
                >
                  <img src={logo} width={"80px"} />
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>
      </header>

      <main className="profile_body">
        <form onSubmit={handleSubmit}>
          <section className="input_sec">
            <div>
              <img
                src={formData.profilePicture || currentUser.profilePicture}
                alt="profile"
                className="p_image"
                onClick={() => fileRef.current.click()}
              />
              <p className="text-sm self-center">
                {imageError ? (
                  <span className="text-red-700">
                    Error uploading image (file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span className="text-green-700">
                    Image uploaded successfully
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div>
              <TextField
                className={"inputField"}
                variant="standard"
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div>
              <TextField
                className={"inputField"}
                variant="standard"
                defaultValue={currentUser.username}
                type="text"
                id="username"
                label="Username"
                onChange={handleChange}
              />
            </div>

            <div>
              <TextField
                className={"inputField"}
                variant="standard"
                defaultValue={currentUser.email}
                type="email"
                id="email"
                label="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                className={"inputField"}
                defaultValue="Default Value"
                variant="standard"
                type="password"
                id="password"
                label="Password"
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="btn_sec">
            <Stack direction="row" justifyContent="center" spacing={3}>
              <Button variant="outlined">close</Button>
              <Button variant="contained" type="submit">
                {loading ? "Loading..." : "Update"}
              </Button>
            </Stack>
          </section>
        </form>
      </main>
      <ToastContainer/>
    </>
  );
}

export default Profile;
