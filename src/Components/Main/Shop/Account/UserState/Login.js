import React from "react";
import { useState } from "react";
import { auth } from "../../../../../Firebase-config";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import alertify from "alertifyjs";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Login = () => {
  function handleSubmit(e) {
    e.preventDefault();
  }
  const [user, setUser] = useState({});

  React.useEffect(() => {
    const loginPage = document.querySelector(".loginPage");
    function logOutPage() {
      loginPage.style.display = "block";
    }
    function logInPage() {
      loginPage.style.display = "none";
    }
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    if (user) {
      logInPage();
    } else {
      logOutPage();
    }
    // Notice the empty dependency array, there to make sure the effect is only run once when the component mounts
  }, [user]);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      updateProfile(auth.currentUser, {
        displayName: registerName,
      })
        .then(() => {
          successNotifier("User account created!");
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // console.log(error.message);
          // ...
        });
      // console.log(user);
    } catch (error) {
      errorNotifier(error.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      // console.log(error.message);
    }
  };
  function successNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.success(message, 2);
  }
  function errorNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.error(message, 2);
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      // console.log(user);
      successNotifier("Logged in to Peaceful Nature.");
    } catch (error) {
      // console.log(error.message);
      errorNotifier(error.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  function RegisterUser() {
    const notAuth = document.querySelector(".register");
    const alreadyAuth = document.querySelector(".login");
    notAuth.style.display = "block";
    alreadyAuth.style.display = "none";
  }
  function LoginUser() {
    const notAuth = document.querySelector(".register");
    const alreadyAuth = document.querySelector(".login");
    notAuth.style.display = "none";
    alreadyAuth.style.display = "block";
  }

  return (
    <div className="loginPage">
      <div className="loggedOutPage">
        <div className="Account-detail">
          {/* Handle register */}
          <div className="register">
            <h2>Create Account</h2>
            <form className="register-user" onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { md: "1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  required
                  fullWidth
                  label="Full name"
                  id="FullName"
                  onChange={(event) => {
                    setRegisterName(event.target.value);
                  }}
                  type="text"
                  name="registerName"
                />

                <TextField
                  required
                  fullWidth
                  label="Email"
                  id="userEmail"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                  type="email"
                  name="registerEmail"
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  id="userPassword"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                  type="Password"
                  name="registerPassword"
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    handleToggle();
                    register();
                  }}
                  type="submit"
                  id="register-user"
                  color="success"
                >
                  Register Account
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>
            </form>
            <p className="existingAccount">
              If you have an account, please{" "}
              <Button variant="outlined" color="primary" onClick={LoginUser}>
                Login here
              </Button>
            </p>
          </div>
          {/* Handle Login */}
          <div className="login">
            <h2>Log in to your Account</h2>
            <form className="login-user" onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { md: "1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  required
                  fullWidth
                  label="Email"
                  id="loginEmail"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  type="email"
                  name="loginEmail"
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  id="loginPassword"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                  type="Password"
                  name="loginPassword"
                />
                <Button
                  onClick={() => {
                    handleToggle();
                    login();
                  }}
                  type="submit"
                  id="login-user"
                  variant="contained"
                  color="success"
                >
                  Log in
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <p className="noAccount">
                  If you don't have an account, please{" "}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={RegisterUser}
                  >
                    Create an account
                  </Button>
                </p>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
