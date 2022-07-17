import React, { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useCart } from "react-use-cart";
import { PaystackButton } from "react-paystack";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../../../Firebase-config";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Skeleton from "@mui/material/Skeleton";
import emailjs from "@emailjs/browser";
import "./Checkout.css";

export default function Checkout() {
  const form = useRef();

  const { isEmpty, items, cartTotal, emptyCart } = useCart();

  const publicKey = process.env.REACT_APP_PAYSTACK_KEY;
  const amount = cartTotal * 100 + 6000;
  const currency = "ZAR";
  const [user, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const userPaxi = address.replace(/,/g, " ");
  const Userreference = new Date().getTime().toString();

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setName(currentUser));
    if (user) {
      console.log(user.displayName);
    } else {
    }
    // Notice the empty dependency array, there to make sure the effect is only run once when the component mounts
  }, [user]);

  const orderCollectionRef = collection(db, "orders");
  let navigate = useNavigate();
  const email = user ? user.email : "example@example.com";
  const fullName = user ? user.displayName : "example";

  const createOrder = async () => {
    await addDoc(orderCollectionRef, {
      userID: user.uid,
      profile: { fullName: user.displayName, userEmail: email },
      Phone: phone,
      products: items,
      OrderDate: Date(),
      Total: cartTotal,
    })
      .then(function (res) {
        emailjs
          .sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE,
            process.env.REACT_APP_EMAILJS_TEMPLATE,
            form.current,
            process.env.REACT_APP_EMAILJS_API
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
        navigate("/account");
        emptyCart();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const componentProps = {
    reference: Userreference,
    email,
    amount,
    currency,
    metadata: {
      custom_fields: [
        {
          display_name: "Full name",
          variable_name: "Full name",
          value: fullName,
        },
        {
          display_name: "Phone",
          variable_name: "Phone",
          value: phone,
        },
        {
          display_name: "PEP Address",
          variable_name: "PEP Address",
          value: userPaxi,
        },
      ],
    },
    publicKey,
    text: "Pay Now",

    onSuccess: () => createOrder(),

    // onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  function receiveMessage(message) {
    if (
      message.origin === "https://map.paxi.co.za" &&
      message.data &&
      message.data.trg === "paxi"
    ) {
      /* Modify the code below for your application */
      const paxiPoint = document.querySelector("#paxi-point");
      paxiPoint.value = Object.values(message.data.point);
      const paxiKey = document.querySelector(".paxi-point-popup");
      paxiKey.style.display =
        "none"; /* Add additional logic below (eg: closing modal) */
    }
  }
  if (window.addEventListener) {
    window.addEventListener("message", receiveMessage, false);
  } else {
    /* support for older browsers (IE 8) */
    window.attachEvent("onmessage", receiveMessage);
  }

  function paxiPopUp() {
    const paxiKey = document.querySelector(".paxi-point-popup");
    paxiKey.style.display = "block";
  }
  if (document.querySelector(".paystack-button")) {
    if (phone === "") {
      const displayPaystack = document.querySelector(".paystack-button");
      displayPaystack.style.display = "none";
    } else {
      const displayPaystack = document.querySelector(".paystack-button");
      displayPaystack.style.display = "block";
    }
  }
  if (isEmpty)
    return (
      <div className="empty-item">
        <Box sx={{ width: "80%" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
        <h1 className="empty-cart">
          There are no products to pay for.
          <br />
          Add some items to your cart
        </h1>
      </div>
    );
  if (!user)
    return (
      <Box sx={{ height: "50vh" }}>
        <div>Please login to check out</div>
      </Box>
    );
  return (
    <div className="checkoutState">
      <h2 className="checkoutText">Checkout</h2>
      <form
        POST="https://api.emailjs.com/api/v1.0/email/send"
        ref={form}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: { md: "2fr 1fr" },
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 2,
            }}
            className="justCheckoutBox"
          >
            <TextField
              fullWidth
              label="Full Name"
              value={user == null ? "example name" : user?.displayName || ""}
              id="outlined-read-only-input"
              helperText="Please enter your full name"
              required
              name="from_name"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              helperText="Phone number is required for delivery"
              fullWidth
              type="tel"
              label="Phone number"
              id="phoneNumber"
              name="from_phone"
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <TextField
              id="outlined-read-only-input"
              required
              fullWidth
              label="Email"
              value={user == null ? "example@example.com" : user?.email || ""}
              type="email"
              name="from_email"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="paxi-point"
              name="from_address"
              required
              fullWidth
              variant="filled"
              placeholder="Paxi Address"
              type="address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button variant="outlined" onClick={paxiPopUp}>
              Click to choose Paxi Point
            </Button>
          </Box>
          <div className="subTotal">
            <div className="subtotal checkoutflex">
              <h5>Subtotal</h5>
              <h5>R{cartTotal}</h5>
            </div>
            <div className="shipping checkoutflex">
              <h5>Shipping</h5>
              <h5>R60</h5>
            </div>
            <div className="totalAmount checkoutflex">
              <h5>Total</h5>
              <h3>R{cartTotal + 60}</h3>
            </div>
            <PaystackButton
              type="submit"
              className="paystack-button"
              {...componentProps}
            />
          </div>
        </Box>
      </form>
      <div className="paxi-point-popup">
        <iframe
          title="Paxi"
          width="100%"
          height="100%"
          src="https://map.paxi.co.za?size=l,m,s&status=1&maxordervalue=1000&output=nc,sn&select=true"
          frameBorder="0"
          allow="geolocation"
        ></iframe>
      </div>
    </div>
  );
}
