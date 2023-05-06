import React from "react";
import "./Checkout.css";
import { Button, Stack, TextInput } from "@mantine/core";

export default function Paxi({ paxi }) {


  function receiveMessage(message) {
    if (
      message.origin === "https://map.paxi.co.za" &&
      message.data &&
      message.data.trg === "paxi"
    ) {
      paxi.setFieldValue('address', Object.values(message.data.point))
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

  return (
    <>

      <Stack>
        <TextInput
          id="paxi-point"
          name="from_address"
          required
          label="Paxi Address"
          value={paxi.values.address}
          placeholder="Paxi Address"
          type="address"
          onChange={(event) => paxi.setFieldValue('address', event.currentTarget.value)}
          error={paxi.errors.address && 'Please choose Paxi point below'}
        />
        <Button color={'green'} onClick={paxiPopUp}>
          Click to choose Paxi Point
        </Button>
      </Stack>
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
    </>
  );
}
