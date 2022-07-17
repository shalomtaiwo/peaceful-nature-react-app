import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useCart } from "react-use-cart";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import Data from "./Product/Data";
import "./Shop.css";

const Shop = () => {
  const { addItem } = useCart();

  function addToCart(item) {
    addItem(item);
  }

  function successNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.success(message, 2);
  }

  return (
    <div className="Shop">
      <div className="archives">
        {Data.productData.map((item, index) => {
          return (
            <Card
              key={index}
              className="ProductCard"
              sx={{ width: "30%", height: "100%" }}
              id={item.id}
            >
              <Link to={`/shop/product/${item.slug}`}>
                <CardActionArea>
                  <CardMedia
                    className="ProductMedia"
                    component="img"
                    height="330"
                    image={item.img}
                    alt="Morings Capsules"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: R{item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  onClick={() => {
                    addToCart(item);
                    successNotifier(item.title + " added to Cart");
                  }}
                >
                  ADD TO CART
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
