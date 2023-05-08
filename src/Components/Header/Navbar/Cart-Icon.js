import * as React from "react";
import { Indicator } from "@mantine/core";
import { useCart } from "react-use-cart";
import { IconShoppingCart } from "@tabler/icons-react";

export default function AddCartIcon() {
	const { totalItems } = useCart();
	return (
		<Indicator
			label={totalItems}
			color="red" radius="xs" size={9} withBorder processing
		>
			<IconShoppingCart size={19} />
		</Indicator>
	);
}
