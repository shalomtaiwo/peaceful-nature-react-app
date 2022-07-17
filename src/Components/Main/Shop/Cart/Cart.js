import React from "react";
import { useCart } from "react-use-cart";
import "./Cart.css";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  function successNotifier(message) {
    alertify.set("notifier", "position", "top-left");
    alertify.success(message, 2);
  }
  function errorNotifier(message) {
    alertify.set("notifier", "position", "top-left");
    alertify.error(message, 2);
  }

  if (isEmpty)
    return (
      <div className="empty-item">
        <Box sx={{ width: "80%" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
        <h1 className="empty-cart">Your Cart is Empty</h1>
      </div>
    );

  return (
    <div className="Cart">
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-main-header">
            <p className="cart-heading">Shopping Cart</p>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                emptyCart();
                errorNotifier("Cart has been cleared");
              }}
            >
              Clear Cart
            </Button>
          </div>
          <div className="total-of">
            <p>
              Cart ({totalUniqueItems}) total Items: ({totalItems}){" "}
            </p>
          </div>
          <div className="item-cart">
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <div className="item-latest">
                    <div className="item-image">
                      <Link to={`/shop/product/${item.slug}`}>
                        <img src={item.img} alt={item.title} />
                      </Link>
                    </div>
                    <div className="item-details">
                      <div className="item-title">{item.title}</div>
                      <div className="item-price">R {item.price}</div>
                    </div>
                  </div>
                  <div className="item-latest-footer">
                    <div className="item-quantity">
                      Quantity: {item.quantity}
                    </div>
                    <div className=""></div>
                    <div className="item-update">
                      <div className="add-remove">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            updateItemQuantity(item.id, item.quantity - 1);
                            errorNotifier("Cart updated");
                          }}
                        >
                          -
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            updateItemQuantity(item.id, item.quantity + 1);
                            successNotifier("Cart updated");
                          }}
                        >
                          +
                        </Button>
                      </div>
                      <div className="remove-item">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            removeItem(item.id);
                            errorNotifier(item.title + " removed from cart");
                          }}
                        >
                          Remove Item
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <h2>Total Price: R {cartTotal}</h2>
            </div>
            {/* <div className='cart-checkour'>
                    <Link className='linkItem' to='/checkout'>
                    <Button variant="contained" color="success" >Checkout</Button>
                        </Link>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
