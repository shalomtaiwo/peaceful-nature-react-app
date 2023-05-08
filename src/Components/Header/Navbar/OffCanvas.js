import {ActionIcon, Center, Drawer, Stack} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconMenu} from "@tabler/icons-react";
import * as React from "react";
import {NavLink} from "react-router-dom";

export default function OffCanvas() {
  const [opened, {open, close}] = useDisclosure(false);

  const links = [
    {
      link : "/about",
      label : "About Us",
    },
    {
      link : "/privacypolicy",
      label : "Privacy Policy",
    },
    {
      link : "/tc",
      label : "Terms and Conditions",
    },
    {
      link : "/contact",
      label : "Contact Us",
    },
  ];
  const activeStyle = {
		color: 'green'
	}

	const items = links.map((link) => (
		<NavLink
  key = {link.label} to = {link.link} style = {({isActive}) => (
                                                   isActive
                                                       ? activeStyle
                                                       : undefined)} className =
      {'navlink'} >
      {link.label}<
          /NavLink>
	));

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				title=""
				position="right"
				overlayProps={{ opacity: 0.5, blur: 4 }}
			>
				<Center>
					<Stack>{items}</Stack>
      </Center>
			</Drawer>

      <ActionIcon onClick = {open}><IconMenu size = { 19 } />
			</ActionIcon><
      />
	);
}
