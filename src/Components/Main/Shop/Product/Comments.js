import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import alertify from "alertifyjs";
import { Button } from "@mantine/core";

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
        onClick={handleClickOpen("paper")}
        variant="outlined"
        color="green"
      >
        Submit review
      </Button>
        <form
          className="comments"
          POST="https://api.emailjs.com/api/v1.0/email/send"
          ref={form}
          onSubmit={handleSubmit}
        >
          
        </form>
    </div>
  );
};

export default Comments;
