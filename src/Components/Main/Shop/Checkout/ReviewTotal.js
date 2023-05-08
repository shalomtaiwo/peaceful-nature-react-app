import "./Checkout.css";

import {Divider, Image, Space, Text, Title} from '@mantine/core';
import React from "react";
import {useCart} from "react-use-cart";

import {DeliveryContext} from "../Cart/Stepper";

export default function ReviewTotal(
    {children, reviewClass, summaryClass, childrenTop, style}) {
  const {cartTotal, items} = useCart();
  const {value} = React.useContext(DeliveryContext);

    const rows = items.map((element, index) => (
        <div key={index} style={{
    display: 'flex', padding: '8px 0'
        }}>
            <div>
                <Image src={element.img} maw={120} alt={
    element.desc} />
            </div>
            <div>
                <Text>{element.title}</Text>
                <Text>Qty: {element.quantity}</Text>
                <b>R{element.itemTotal}</b>
            </div>
        </div>
    ));


    return (
        <div className={reviewClass} style={style}>
            <div>
                {childrenTop}
            </div>
            <div className={summaryClass}>
                <Title order={3}>Order Summary</Title>

                <div>
                    {rows}
                </div>
            </div>
            <div className="subTotal">
            <Divider />

                <div className="subtotal checkoutflex">
                    <Text>Subtotal</Text>
                    <Text>R{cartTotal}</Text>
                </div>
                <div className="shipping checkoutflex">
                    <Text>Shipping</Text>
                    <Text>{(value !== null ?  `R${value}` : 'Delivery required')}</Text>
                </div>
                <Divider />
                <Space h="md"/>
                <div className="totalAmount checkoutflex">
                    <Title order={4}>Total</Title>
                    <Title order={4}>R{cartTotal + (value !== null ? parseInt(value) : 0)}</Title>
                </div>
                <Space h="md"/>
                <div>
                {(value !== null && children)}
                </div>
            </div>
        </div>

    );
}
