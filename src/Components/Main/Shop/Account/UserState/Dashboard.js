import {createStyles, Group, Navbar, Title} from "@mantine/core";
import {
  IconDashboard,
  IconHome,
  IconLogout,
  IconReceipt2,
  IconSettings,
} from "@tabler/icons-react";
import alertify from "alertifyjs";
import {signOut} from "firebase/auth";
import {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {NavLink} from "react-router-dom";

import {auth} from "../../../../../Firebase-config";

const useStyles = createStyles(
    (theme) => ({
      header : {
        paddingBottom : theme.spacing.md,
        paddingTop : theme.spacing.md,
        paddingLeft : theme.spacing.md,
        marginBottom : `calc(${theme.spacing.md} * 1.5)`,
        borderBottom : `1px solid ${theme.colors.gray[2]}`,
        borderTop : `1px solid ${theme.colors.gray[2]}`,
      },

      normal : {
        paddingLeft : theme.spacing.md,
      },

      footer : {
        paddingLeft : theme.spacing.md,
        paddingTop : theme.spacing.md,
        marginTop : theme.spacing.md,
        borderTop : `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4]
                                         : theme.colors.gray[2]}`,
      },

      link : {
        ...theme.fn.focusStyles(),
        display : "flex",
        alignItems : "center",
        textDecoration : "none",
        fontSize : theme.fontSizes.sm,
        color : theme.colorScheme === "dark" ? theme.colors.dark[1]
                                             : theme.colors.green[7],
        padding : `15px 5px`,
        borderRadius : theme.radius.sm,
        fontWeight : 500,

        "&:hover" : {
          backgroundColor : theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.green[0],
          color : theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },

      linkIcon : {
        color : theme.colorScheme === "dark" ? theme.colors.dark[2]
                                             : theme.colors.gray[6],
        marginRight : theme.spacing.sm,
      },

      linkActive : {
        "&, &:hover" : {
          backgroundColor : theme.colors.lime[0],
          color : theme.fn.variant({
            variant : "light",
            color : theme.colors.green[0],
          }),
        },
      },
    }));

const data = [
  {link : "", label : "Dashboard", icon : IconDashboard},
  {link : "orders", label : "Orders", icon : IconReceipt2},
  {link : "settings", label : "Settings", icon : IconSettings},
  {link : "addresses", label : "Addresses", icon : IconHome},
];

export function Dashboard({children}) {
  const {classes, cx} = useStyles();
  const [active, setActive] = useState("Billing");

        const activeStyle = {
		color: 'green'
	}

	const links = data.map((item) => (
		<NavLink
        className = {`${cx(classes.link)} navlink`} to = {item.link} style = {
            ({isActive}) =>
                (isActive ? activeStyle : undefined)} color = "green"
        key = {item.label} onClick = {() => { setActive(item.label); }} > <
                                     item.icon
        className = {classes.linkIcon} stroke =
        { 1.5 } />
			<span>{item.label}</span >
            </NavLink>
	));

	const [user, loading, error] = useAuthState(auth);

	function warningNotifier(message) {
		alertify.set("notifier", "position", "top-center");
		alertify.warning(message, 2);
	}

	const logout = async () => {
		await signOut(auth);
		warningNotifier("Logged out of Peaceful Nature");
	};

	if (loading) {
		return (
			<div>
				<p>Initialising User...</p>
            </div>
		);
	}
	if (error) {
		return (
			<div>
				<p>Error: {error}</p>
            </div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
			}}
		>
			<div
				style={{
					width: "300px",
				}}
			>
				<Navbar
					height={"calc(100vh - 80px)"}
					width={{ sm: 300 }}
					p="md"
				>
					<Navbar.Section grow>
						<Group
							className={classes.header}
							position="apart"
						>
							<Title order={4}>Hello {user?.displayName}!</Title>
            </Group>
						<div className={classes.normal}>{links}</div><
            /Navbar.Section>

					<Navbar.Section className={classes.footer}>
						<a
							href="#/"
        className = {classes.link} onClick = {logout} > < IconLogout
        className = {classes.linkIcon} stroke =
        { 1.5 } />
							<span>Logout</span > </a>
					</Navbar.Section>
            </Navbar>
			</div>< div
        style = {
          { width: "calc(100% - 300px)", margin: "0 auto", maxWidth: "850px", }
        } > < div
        style = {{ margin: "0 20px", }} > {children}</div>
			</div><
                /div>
	);
}
