import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import { AboutUsBanner } from "./AboutUsBanner";
import { FaqWithBg } from "./Faq";
import { AboutMoringa } from "./AboutMoringa";
import { Space } from "@mantine/core";

const About = () => {
  let navigate = useNavigate();
  function shop() {
    navigate("/shop");
  }
  return (
    <div className="About">
      <AboutUsBanner />
      <div className="about-moringa">
        <p>
          Moringa is a natural, powerful plant that has been used for centuries
          to help with many health issues. The leaves of the Moringa tree, which
          are dried and then turned into capsules, can provide relief for many
          people who may not know what else to do. Moringa can help prevent and
          even treat chronic diseases like inflammation diseases, diabetes,
          cancer, arthritis and hypertension. It's also great for preventing
          fever. In fact, it's been found to be one of the most antioxidant-rich
          foods on earth!
        </p>
        <p>
          Our Moringa capsules are made of 100% pure raw Moringa leaf powder,
          guaranteed to have the highest percentage of bioactives and nutrients
          from the original plant. They're easy to take and quickly release the
          nutrients, making them a convenient & cost-effective way to get your
          daily dose of moringa. It's 100% natural, gluten-free, and vegan!
          Increases energy levels - Increases immunity - Increases metabolism -
          Increases stamina - Increases blood flow - Reduces muscle pain. For
          those who are looking for an all-natural way to restore energy, fight
          pain, and prevent disease, our products are a great choice.
        </p>
      </div>
      <AboutMoringa goTo={shop} />
      <div className="about-moringa">
        <p>
          Moringa is a miracle plant with many uses. This is just the start!
          It's said to have many health benefits, including blood purification
          and cancer prevention. Research on Moringa is still being done, but
          it's been used for centuries in many countries. Moringa's benefits are
          said to come from its high levels of vitamins A, C, E, calcium, iron,
          zinc, and magnesium.
        </p>
        <p>
          Moringa is a natural plant which can be used to prevent and treat a
          number of chronic conditions. Moringa is one of the healthiest plants
          on earth. The list of health benefits of Moringa leaves include
          tackling mental health problems and inflammation.
          <br />
          <br />
          Moringa is an extremely affordable, natural way to get your daily dose
          of vitamins and minerals.
        </p>
        <Space h="xl" />
        <div id="faq">
          <FaqWithBg />
        </div>
      </div>
    </div>
  );
};

export default About;
