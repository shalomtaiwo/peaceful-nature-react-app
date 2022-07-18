import React, {  useRef } from "react";
import "./ContactUs.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import PlaceTwoToneIcon from "@mui/icons-material/PlaceTwoTone";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import { Button, Box, TextField } from "@mui/material";
import emailjs from "@emailjs/browser";


const ContactUs = () => {

  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
          .sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE,
            process.env.REACT_APP_EMAILJS_TEMPLATE_FORM,
            form.current,
            process.env.REACT_APP_EMAILJS_API
          )
  };

  return (
    <div>
      <div className="contactHeader"></div>
      <div className="contactBody">
        <div className="contactDetails">
          <div className="detailHeading">
            <h3>Contact Details</h3>
            <p>Feel free to reach out to us for any enquiries.</p>
          </div>
          <div className="detailContacts">
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "whitesmoke" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "black" }}>
                    <EmailTwoToneIcon color="yellow" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Email"
                  secondary="info@peacefulnature.co.za"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "black" }}>
                    <PlaceTwoToneIcon color="success" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Address"
                  secondary="Cape Town, South Africa"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "black" }}>
                    <FacebookTwoToneIcon color="error" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Facebook" secondary="Peaceful Nature" />
              </ListItem>
            </List>
          </div>
        </div>
        <div className="contactMap">
          <iframe
            title="google map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423811.7231397944!2d18.375876582975224!3d-33.91465094948949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town!5e0!3m2!1sen!2sza!4v1657684489590!5m2!1sen!2sza"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
      <div className="contactForm">
        <form
          POST="https://api.emailjs.com/api/v1.0/email/send"
          ref={form}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                display: "grid",
                gridTemplateColumns: { md: "1fr" },
                gap: 2,
              }}
              className="myinput"
            >
              <TextField
                required
                fullWidth
                type="text"
                label="Full name"
                id="fullname"
                name="from_fullname"
              />

              <TextField
                label="Email"
                name="from_useremail"
                required
                fullWidth
                color="success"
                type="email"
              />

              <TextField
                label="Message"
                name="from_usermessage"
                required
                fullWidth
                color="warning"
                type="text"
                multiline
                rows={5}
              />
              <Button
                variant="outlined"
                color="success"
                type="submit"
                onClick={0}
              >
                Send message
              </Button>
            </Box>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
