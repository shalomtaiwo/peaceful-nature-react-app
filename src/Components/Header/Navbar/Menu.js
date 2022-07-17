import * as React from "react";
import Box from "@mui/material/Box";
// import Avatar from '@mui/material/Avatar';
import Menu from "@mui/material/Menu";
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import Logo from "./Assets/logo.png";
import OffCanvas from "./OffCanvas";
import "./NavBar.css";
import { Link } from "react-router-dom";
import AddCartIcon from "../Navbar/Cart-Icon";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mainmenu">
      <div className="logo">
        <img srcSet={Logo} alt="logo" />
      </div>
      <div className="mobileNav">
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Typography
              sx={{ minWidth: 100 }}
              label="Home"
              to="/"
              component={Link}
            >
              Home
            </Typography>
            <Typography
              sx={{ minWidth: 100 }}
              label="About"
              to="/about"
              component={Link}
            >
              About
            </Typography>
            <Typography
              sx={{ minWidth: 100 }}
              label="Shop"
              to="/shop"
              component={Link}
            >
              Shop
            </Typography>
            <Typography
              sx={{ minWidth: 100 }}
              label="Account"
              to="/account"
              component={Link}
            >
              Account
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          ></Menu>
        </React.Fragment>
      </div>
      <div className="sideIcons">
        <OffCanvas />
        <Typography
          className="topCartIcon mobileNav"
          label="cart"
          to="/cart"
          component={Link}
        >
          <AddCartIcon />
        </Typography>
      </div>
    </div>
  );
};

export default NavBar;
