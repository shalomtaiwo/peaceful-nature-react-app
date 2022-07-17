import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useCart } from "react-use-cart";
import alertify from "alertifyjs";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { addItem } = useCart();

  function addToCart() {
    addItem(props.item);
  }

  function successNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.success(message, 2);
  }
  return (
    <Card
      className="ProductCard"
      sx={{ width: "50%", height: "100%" }}
      id={props.id}
    >
      <CardActionArea>
        <CardMedia
          className="ProductMedia"
          component="img"
          height="330"
          image={props.img}
          alt="Morings Capsules"
        />
        <CardContent>
          <Link to={`/product/${props.id}`}>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            Price: R{props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            addToCart();
            successNotifier(props.title + " added to Cart");
          }}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
