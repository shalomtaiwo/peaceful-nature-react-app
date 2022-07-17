import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CartIcon from "./Cart-Icon";
import { useState } from "react";

export default function BottomNav() {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            to="/"
            className="homeTab"
            icon={<HomeIcon />}
            component={Link}
          />
          <BottomNavigationAction
            label="Account"
            to="/account"
            className="AccountTab"
            icon={<AccountCircle />}
            component={Link}
          />
          <BottomNavigationAction
            label="Shop"
            to="/shop"
            className="shopTab"
            icon={<AddBusinessIcon />}
            component={Link}
          />
          <BottomNavigationAction
            label="Cart"
            to="/cart"
            className="checkoutTab"
            icon={<CartIcon />}
            component={Link}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
