import React from "react";
import "./ContactUs.css";
import { GetInTouchSimple } from "./ContactForm";
import { ContactIconsList } from "./ContactIcons";
import { Title } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

const ContactUs = () => {
  const matches = useMediaQuery('(max-width: 700px)');
  return (
    <div>
      {
        matches && <div className="contactForm">
          <GetInTouchSimple />
        </div>
      }
      <div className="contactBody">
        <div className="contactDetails">
          <div className="detailHeading">
            <Title>Contact information</Title>
            <p>Feel free to reach out to us for any enquiries.</p>
          </div>
          <div className="detailContacts">
            <ContactIconsList variant="gradient" />
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
      {
        !matches && <div className="contactForm">
          <GetInTouchSimple />
        </div>
      }
    </div>
  );
};

export default ContactUs;
