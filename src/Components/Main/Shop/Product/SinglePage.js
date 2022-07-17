import React from "react";
import { useParams } from "react-router-dom";
import Data from "./Data";
import {
  Button,
  Box,
  Avatar,
  Breadcrumbs,
  Link,
  List,
  Divider,
  Tab,
  Tabs,
  ListItem,
  Typography,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useCart } from "react-use-cart";
import alertify from "alertifyjs";
import PropTypes from "prop-types";
import Comments from "./Comments";
import Error from "../../../../Error";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SinglePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { addItem } = useCart();

  function addToCart(item) {
    addItem(item);
  }
  function successNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.success(message, 2);
  }

  let { itemId } = useParams();

  const product = Data.productData.find((product) => product.slug === itemId);
  if (!product)
    return (
      <div>
        <Error />
      </div>
    );

  const { img, title, price, desc, reviews } = product;

  return (
    <div className="singleProduct">
      <div role="presentation" className="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/shop">
            Shop
          </Link>
          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>
      </div>
      <div className="singleItem">
        <div className="singleImage">
          <img srcSet={img} alt={title} />
        </div>
        <div className="singleDetails">
          <div className="singlePrice">
            <h4>{title}</h4>
            <h5>R{price}</h5>
          </div>
          <div className="singleCart">
            <Button
              variant="outlined"
              size="medium"
              color="success"
              onClick={() => {
                addToCart(product);
                successNotifier(title + " added to Cart");
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%" }} variant="div">
        <Box variant="div" sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="div"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab variant="div" label="Description" {...a11yProps(0)} />
            <Tab
              variant="div"
              label={`Reviews ${reviews.length}`}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} variant="div">
          {desc}
        </TabPanel>
        <TabPanel value={value} index={1} variant="div">
          <Comments />
          {reviews
            .map((rating, index) => {
              return (
                <List
                  key={index}
                  sx={{ width: "100%", bgcolor: "background.paper" }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "black" }} alt={rating.user}>
                        {rating.user.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={rating.user}
                      secondary={
                        <React.Fragment>{rating.review}</React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              );
            })
            .reverse()}
        </TabPanel>
      </Box>
    </div>
  );
};

export default SinglePage;
