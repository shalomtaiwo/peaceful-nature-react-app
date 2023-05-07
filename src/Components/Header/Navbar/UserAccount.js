import { Menu, ActionIcon } from "@mantine/core";
import {
	IconSettings,
	IconUserCircle,
    IconDashboard,
    IconCategory,
    IconHomeEdit,
    IconDoorExit,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

export default function UserAccount() {
	return (
		<Menu
			shadow="md"
			width={200}
		>
			<Menu.Target>
				<ActionIcon size="lg">
					<IconUserCircle size={20} />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Account</Menu.Label>
				<NavLink to={"/account"} className={'navlink'}>
					<Menu.Item icon={<IconDashboard size={14} />}>Dashboard</Menu.Item>
				</NavLink>
                <NavLink to={"/account/orders"} className={'navlink'}>
					<Menu.Item icon={<IconCategory size={14} />}>Orders</Menu.Item>
				</NavLink>
                <NavLink to={"/account/settings"} className={'navlink'}>
					<Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
				</NavLink>
                <NavLink to={"/account/addresses"} className={'navlink'}>
					<Menu.Item icon={<IconHomeEdit size={14} />}>Addresses</Menu.Item>
				</NavLink>

				<Menu.Divider />
				<Menu.Item
					color="red"
					icon={<IconDoorExit size={14} />}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}