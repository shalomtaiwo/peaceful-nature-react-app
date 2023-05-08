import "./NavBar.css";

import {
  ActionIcon,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Logo from "./Assets/logo.png";
import AddCartIcon from "./Cart-Icon";
import OffCanvas from "./OffCanvas";
import UserAccount from "./UserAccount";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: "260px",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: "260px",

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function NavBar() {
  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/shop",
      label: "Shop",
    },
  ];

  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const activeStyle = {
    color: "green",
    fontWeight: "bold",
  };

  const navigate = useNavigate();

  const cart = () => {
    navigate("/cart");
  };

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      className={"navlink"}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={90} pt={10}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.links} spacing={22}>
          {items}
        </Group>

        <img src={Logo} alt="logo" width={80} />

        <Group spacing={22} className={classes.social} position="right" noWrap>
          <UserAccount />

          <ActionIcon size={29} onClick={cart}>
            <AddCartIcon />
          </ActionIcon>

          <ActionIcon size="lg">
            <OffCanvas />
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}
