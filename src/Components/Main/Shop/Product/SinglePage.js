import React from "react";
import { Link, useParams } from "react-router-dom";
import Data from "./Data";
import { useCart } from "react-use-cart";
import alertify from "alertifyjs";
//import Comments from "./Comments";
import Error from "../../../../Error";
import { Space, Tabs, Text, Title, NumberInput, Group, ActionIcon, Button, Divider, Breadcrumbs } from '@mantine/core';
import { IconMinus, IconPlus } from "@tabler/icons-react";


const SinglePage = () => {
  const [value, setValue] = React.useState(1);
  const handlers = React.useRef();


  const { addItem } = useCart();

  function addToCart(item, quantity) {
    addItem(item, quantity);
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

  const { img, title, price, desc,
    //reviews 
  } = product;

  return (
    <div className="singleProduct">
      <div role="presentation" className="breadCrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">
            Home
          </Link>
          <Link to="/shop">
            Shop
          </Link>
          <Text color="black">{title}</Text>
        </Breadcrumbs>
      </div>
      <div className="singleItem">
        <div className="singleImage">
          <img srcSet={img} alt={title} />
        </div>
        <div className="singleDetails">
          <Tabs color="green" defaultValue="description">
            <Title order={2}>{title}</Title>
            <Space h="xl" />
            <Tabs.List>
              <Tabs.Tab value="description">Description</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="description">
              <Space h="xl" />
              <Text>{desc}</Text>
            </Tabs.Panel>
          </Tabs>
          <Space h="xl" />
          <Group spacing={5}>
            <ActionIcon size={35} disabled={value === 1} variant="light" color={"lime"} onClick={() => handlers.current.decrement()}>
              <IconMinus />
            </ActionIcon>

            <NumberInput
              hideControls
              value={value}
              onChange={(val) => setValue(val)}
              handlersRef={handlers}
              max={24}
              min={0}
              step={1}
              styles={{ input: { width: "60px", textAlign: 'center' } }}
            />

            <ActionIcon size={35} variant="light" color={"green"} onClick={() => handlers.current.increment()}>
              <IconPlus />
            </ActionIcon>
          </Group>
          <div>

          </div>
          <Space h="xl" />
          <Divider />
          <div className="singleCart">
            <div className="singlePrice">
              <h2>R{price}</h2>
            </div>
            <Button
              variant="outlined"
              color="green"
              onClick={() => {
                addToCart(product, value);
                value > 0 && successNotifier(title + " added to Cart");
              }}
            >
              Add to Cart
            </Button>
          </div>
          <Divider />
          <Space h="xl" />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
