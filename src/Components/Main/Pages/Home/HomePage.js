import React from "react";
import "./HomePage.css";
import review from "./Assets/customer.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import col1 from "./Assets/col1.png";
import col2 from "./Assets/col2.png";
import col3 from "./Assets/col3.png";
import col4 from "./Assets/col4.png";
// Second Column Images
import col1_2 from "./Assets/col1-2.png";
import col2_2 from "./Assets/col2-2.png";
import col3_2 from "./Assets/col3-1.png";
import col4_2 from "./Assets/col4-1.png";

const HomePage = () => {
  let navigate = useNavigate();

  function shop() {
    navigate("/shop");
  }
  return (
    <div className="Home">
      <div className="landingBanner">
        <div className="lbCol1">
          <h3>Moringa is a miracle plant</h3>
          <p>
            It's said to have many health benefits, including blood purification
            and cancer prevention.{" "}
          </p>
        </div>
        <div className="lbCol2"></div>
      </div>
      <div className="homeHeading">
        <div className="hh-left-col"></div>
        <div className="hh-right-col">
          <h4>High in Vitamins</h4>
          <p>
            Research on Moringa is still being done, but it's been used for
            centuries in many countries. Moringa's benefits are said to come
            from its high levels of vitamins A, C, E, calcium, iron, zinc, and
            magnesium.
          </p>
          <Button variant="contained" color="success" onClick={shop}>
            Shop now
          </Button>
        </div>
      </div>
      <div className="features">
        <div className="ft-heading">
          <div className="ftsub-center">
            <h4 className="fthead">BENEFITS</h4>
            <p className="ftbody">
              We're committed to providing the best quality, eco-friendly
              products that are healthy for you and the environment.
            </p>
          </div>
        </div>
        <div className="featurePoints">
          <div className="ft-points">
            <div className="ft-col1">
              <div className="ftsub">
                <img className="col-1-img" srcSet={col1} alt="natural" />
                <p className="ftbody">100% natural, gluten-free, & vegan</p>
              </div>
              <div className="ftsub">
                <img className="col-1-img" srcSet={col2} alt="natural" />
                <p className="ftbody">Increases Metabolism</p>
              </div>
              <div className="ftsub">
                <img className="col-1-img" srcSet={col3} alt="natural" />
                <p className="ftbody">Increases Stamina</p>
              </div>
            </div>
            <div className="ft-col2"></div>
            <div className="ft-col3">
              <div className="ftsub">
                <img className="col-1-img" srcSet={col4_2} alt="natural" />
                <p className="ftbody">Prevents disease and fights pain</p>
              </div>
              <div className="ftsub">
                <img className="col-1-img" srcSet={col2_2} alt="natural" />
                <p className="ftbody">Increases Energy levels</p>
              </div>
              <div className="ftsub">
                <img className="col-1-img" srcSet={col3_2} alt="natural" />
                <p className="ftbody">Increases blood flow</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ftfooter">
          <div className="ftsub">
            <img className="col-1-img" srcSet={col4} alt="natural" />
            <p className="ftbody">Reduces muscle pain</p>
          </div>
          <div className="ftsub">
            <img className="col-1-img" srcSet={col1_2} alt="natural" />
            <p className="ftbody">Increases Energy levels</p>
          </div>
        </div>
      </div>
      <div className="Homecta">
        <div className="ctaborder">
          <div className="ctatext">
            <h4>Check out our discounts!</h4>
            <p>
              Buy our moringa Capsules in bundles of 2 and 4 <br />
              at a discount price
            </p>
          </div>
          <div className="ctabutton">
            <Button variant="contained" color="success" onClick={shop}>
              Shop now
            </Button>
          </div>
        </div>
      </div>
      <div className="testimonial">
        <div className="reviews">
          <div className="review1">
            <h2>Nature's Superfood!!</h2>
            <p className="sub-header">
              I have recently started taking Moringa Capsules and it's been a
              fabulous experience so far. I feel noticeably more energetic,
              focused throughout the day and my stomach is just better. Plus I
              have noticed visible changes in my skin too which just made my
              experience all the better. Moringa Capsules is plant-based and by
              coupling it with a reduced calorie eating plan , I've lost 20
              pounds and 10 inches in my waist!
              <br />- <span className="review-user">Jessica M.</span>
            </p>
          </div>
        </div>
        <div className="img-review">
          <img srcSet={review} alt="review" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
