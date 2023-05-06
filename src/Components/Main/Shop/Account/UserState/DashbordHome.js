import { Button, Center, Group, Stack, Text } from "@mantine/core";
import React from "react";

const DashbordHome = () => {
	return (
		<div>
			<Center maw={900} mx={'auto'} h={300}>
				<Stack spacing="xl" w={600}>
					<Group
						position="center"
						spacing="xl"
						grow
					>
						<Button
							variant="outline"
							size="xl"
							color="green"
						>
							<Text size={14}>Orders</Text>
						</Button>
						<Button
							variant="outline"
							size="xl"
							color="green"
						>
							<Text size={14}>Settings</Text>
						</Button>
					</Group>
					<Group
						position="center"
						spacing="xl"
						grow
					>
						<Button
							variant="outline"
							size="xl"
							color="green"
						>
							<Text size={14}>Addresses</Text>
						</Button>
						<Button
							variant="outline"
							size="xl"
							color="green"
						>
							<Text size={14}>Shop</Text>
						</Button>
					</Group>
				</Stack>
			</Center>
		</div>
	);
};

export default DashbordHome;
