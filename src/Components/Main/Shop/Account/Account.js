import React from "react";
import { Login } from "./UserState/Login";
import { useState } from "react";
import { auth } from "../../../../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Logout from "./UserState/Logout";
import { Breadcrumbs, Link, Typography } from "@mui/material";
const Account = () => {
  const [user, setUser] = useState({});

  React.useEffect(() => {
    const loginPage = document.querySelector(".loginUser");
    const AccountPage = document.querySelector(".logoutUser");
    function logOutPage() {
      AccountPage.style.display = "none";
      loginPage.style.display = "block";
    }
    function logInPage() {
      loginPage.style.display = "none";
      AccountPage.style.display = "block";
    }

    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    if (user) {
      logInPage();
    } else {
      logOutPage();
    }
    // Notice the empty dependency array, there to make sure the effect is only run once when the component mounts
  }, [user]);

  return (
    <div className="UserState">
      <div role="presentation" className="breadCrumbs">
        <h2>My Account</h2>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Account</Typography>
        </Breadcrumbs>
      </div>
      <div className="loginUser">
        <Login />
      </div>
      <div className="logoutUser">
        <Logout />
      </div>
    </div>
  );
};

export default Account;
