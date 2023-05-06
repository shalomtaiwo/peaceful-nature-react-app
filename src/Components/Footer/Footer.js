import { createStyles, Text, Container,  Group } from '@mantine/core';
import Logo from '../Header/Navbar/Assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Subscription } from './Subscribe';
import Secured from "./Assets/secured-by-paystack.webp";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 0,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  groupsSM: {
    display: 'none',

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      paddingTop: '20px'
    },
  },
  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

const data = [
  {
    "title": "General",
    "links": [
      {
        "label": "Home",
        "link": "/"
      },
      {
        "label": "About",
        "link": "about"
      },
      {
        "label": "Shop",
        "link": "shop"
      },
      {
        "label": "Account",
        "link": "account"
      }
    ]
  },
  {
    "title": "Other",
    "links": [
      {
        "label": "Privacy Policy",
        "link": "privacypolicy"
      },
      {
        "label": "T & C",
        "link": "tc"
      },
      {
        "label": "Contact Us",
        "link": "contact"
      },
      {
        "label": "Cart",
        "link": "cart"
      }
    ]
  }
]


export function Footer() {
  const { classes } = useStyles();
  let navigate = useNavigate()

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        onClick={() => navigate(link.link)}
        style={{
          cursor: 'pointer'
        }}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <img src={Logo} alt="Logo" width={60} />
          <Text size="xs" color="dimmed" className={classes.description}>
            We offer a wide range of products for every use - natural and
            organic living essentials.
          </Text>
        </div>
        <div className={classes.groupsSM}>
          <Subscription>Subscribe to Newsletter</Subscription>
        </div>
        <div className={classes.groups}>
          {groups}
          <div className={classes.wrapper}>
            <Text className={classes.title}>Newsletter</Text>
            <Subscription>Subscribe here</Subscription>
          </div>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 peacefulnature.co.za All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <img src={Secured} alt='paystack' width={150} />
        </Group>
      </Container>
    </footer>
  );
}