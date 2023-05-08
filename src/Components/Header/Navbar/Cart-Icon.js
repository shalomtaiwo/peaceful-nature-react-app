import {Indicator} from "@mantine/core";
import {IconShoppingCart} from "@tabler/icons-react";
import * as React from "react";
import {useCart} from "react-use-cart";

export default function AddCartIcon() {
  const {totalItems} = useCart();
        return (
		<Indicator
                        label={totalItems}
			color="red" radius="xs" size={9} withBorder processing
		>
			<IconShoppingCart size={
    19} />
		</Indicator>
	);
}
