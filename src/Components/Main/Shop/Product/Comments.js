import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import emailjs from "@emailjs/browser";
import alertify from "alertifyjs";

const Comments = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [reviewName, setReviewName] = React.useState("");
  const [reviewDesc, setReviewDesc] = React.useState("");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const form = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (reviewName === "" || reviewDesc === "") {
    } else if ((reviewName !== "") & (reviewDesc !== "")) {
      emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_REVIEWS,
        process.env.REACT_APP_EMAILJS_TEMPLATE_REVIEWS,
        form.current,
        process.env.REACT_APP_EMAILJS_API_REVIEWS
      );
      setOpen(false);
      alertify.alert("Review sent successfully").set("basic", true);
    }
  }

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        endIcon={<InsertCommentIcon />}
        onClick={handleClickOpen("paper")}
        variant="outlined"
        color="success"
      >
        Submit review
      </Button>
      <Dialog
        sx={{
          width: "100%",
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form
          className="comments"
          POST="https://api.emailjs.com/api/v1.0/email/send"
          ref={form}
          onSubmit={handleSubmit}
        >
          <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Box
                sx={{
                  width: { sm: "500px" },
                  display: "grid",
                  gridTemplateColumns: { md: "1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  required
                  id="outlined-basic"
                  label="Name"
                  name="from_name"
                  variant="outlined"
                  onChange={(e) => setReviewName(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-textarea"
                  label="Add review"
                  placeholder="review"
                  name="message"
                  multiline
                  onChange={(e) => setReviewDesc(e.target.value)}
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="outlined"
              size="medium"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Comments;
