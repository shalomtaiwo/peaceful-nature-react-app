import { Card, Image, Text, Group, Badge, createStyles, Button, Space } from '@mantine/core';
import { useCart } from "react-use-cart";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: "30%",
    height: "100%"
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: "-4px",
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  icon: {
    marginRight: "80px",
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));


export default function Products(props) {
  const { classes } = useStyles();

  const { addItem } = useCart();

  function addToCart() {
    addItem(props.item);
  }

  function successNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.success(message, 2);
  }

  return (
    <Card withBorder radius="md" className={`${classes.card} ProductCard`}>
      <Card.Section className={classes.imageSection}>
        <Link to={`/shop/product/${props.id}`}>
          <Image src={props.img} alt="Moringa Capsules" />
        </Link>
      </Card.Section>

      <Group position="apart" mt="md">
        <Link to={`/shop/product/${props.id}`}>
          <div>
            <Text color="gray" fw={500}>{props.name}</Text>
          </div>
        </Link>
        {
          props.bundle && <Badge variant="outline" color={"red"}>{props.bundle}</Badge>
        }
      </Group>
      <Space h="xl" />

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              R{props.price}
            </Text>
          </div>

          <Button variant="light" color="green" radius="xl" style={{ flex: 1 }} onClick={() => {
            addToCart();
            successNotifier(props.title + " added to Cart");
          }}>
            Add to Cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}