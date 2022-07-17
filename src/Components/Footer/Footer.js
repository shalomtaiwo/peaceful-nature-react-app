import React, { useState } from "react";
import "./Footer.css";
import Secured from "./Assets/secured-by-paystack.webp";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const [subsEmail, setSubscribe] = useState("");

  const userEmail = subsEmail;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribe = (e) => {
    setOpen(false);
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.REACT_APP_SENDINBLUE_KEY,
      },
      body: JSON.stringify({
        email: userEmail,
        attributes: { FNAME: "", LNAME: "" },
        emailBlacklisted: false,
        smsBlacklisted: false,
        listIds: [36],
        updateEnabled: false,
        smtpBlacklistSender: ["user@example.com"],
      }),
    };

    fetch(process.env.REACT_APP_SENDINBLUE_API, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <div className="Footer">
      <div className="footer">
        <div className="footer-menu">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/about">
            <span>About</span>
          </Link>
          <Link to="account">
            <span>Account</span>
          </Link>
          <Link to="/contact">
            <span>Contact</span>
          </Link>
        </div>
        <Box
          className="boxsubs"
          sx={{
            width: { md: "30%" },
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: { md: "1fr" },
            gap: 2,
          }}
        >
          <Button variant="outlined" color="success" onClick={handleClickOpen}>
            Subscribe to Newsletter
          </Button>
        </Box>
        <form>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setSubscribe(e.target.value)}
                helperText="Non-email inputs will not be subscribed"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubscribe} type="submit">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
      <div className="footer-bottom">
        <div className="copyright">
          <p>©2022 Peaceful Nature</p>
        </div>
        <div className="PayStack-icon">
          <img srcSet={Secured} alt="PayStack" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
