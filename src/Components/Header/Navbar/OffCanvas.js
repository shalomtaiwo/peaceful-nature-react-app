import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
// import Divider from '@mui/material/Divider';
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function OffCanvas() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        sx={{ minWidth: 100, paddingBottom: "30px", paddingTop: "30px" }}
        label="About"
        to="/about"
        component={Link}
      >
        About Moringa
      </Typography>
      <Typography
        sx={{ minWidth: 100, paddingBottom: "30px" }}
        label="Privacy Policy"
        to="/privacypolicy"
        component={Link}
      >
        Privacy Policy
      </Typography>
      <Typography
        sx={{ minWidth: 100, paddingBottom: "30px" }}
        label="Terms-conditions"
        to="/tc"
        component={Link}
      >
        Terms & conditions
      </Typography>
      <Typography
        sx={{ minWidth: 100, paddingBottom: "30px" }}
        label="contact"
        to="/contact"
        component={Link}
      >
        Contact Us
      </Typography>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} color='success'>
            {" "}
            <WidgetsIcon />{" "}
          </Button>
          <SwipeableDrawer
            className="offCanvas"
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
