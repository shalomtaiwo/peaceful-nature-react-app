import React from "react";
import { useCart } from "react-use-cart";
import "./Cart.css";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import { ActionIcon, CloseButton, Group, NumberInput, Title } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

const Cart = () => {
	const { items, updateItemQuantity, removeItem } = useCart();

	function successNotifier(message) {
		alertify.set("notifier", "position", "top-left");
		alertify.success(message, 2);
	}
	function errorNotifier(message) {
		alertify.set("notifier", "position", "top-left");
		alertify.error(message, 2);
	}

	return (
		<div className="">
			<div className="cart-container">
				<div className="cart-header">
					<div className="item-cart">
						{items.map((item, index) => {
							return (
								<div key={index}>
									<div className="remove-item">
										<CloseButton
											variant="light"
											title="Remove"
											color="red"
											onClick={() => {
												removeItem(item.id);
												errorNotifier(item.title + " removed from cart");
											}}
										/>
									</div>
									<div className="item-latest">
										<div className="item-image">
											<Link to={`/shop/product/${item.slug}`}>
												<img
													src={item.img}
													alt={item.title}
												/>
											</Link>
										</div>

										<div className="item-details">
											<div className="item-title">{item.title}</div>
											<div className="item_ft">
												<div className="item-quantity">
													Qty: {item.quantity}
												</div>
												<Group spacing={5}>
													<ActionIcon
														variant="light"
														color={"lime"}
                            disabled={item.quantity === 1} 
														onClick={() => {
															updateItemQuantity(item.id, item.quantity - 1);
															errorNotifier("Cart updated");
														}}
													>
														<IconMinus size="1.125rem" />
													</ActionIcon>

													<NumberInput
														hideControls
														value={item.quantity}
														max={24}
														min={0}
														step={1}
														styles={{
															input: { width: "60px", textAlign: "center" },
														}}
													/>

													<ActionIcon
														variant="light"
														color={"lime"}
														onClick={() => {
															updateItemQuantity(item.id, item.quantity + 1);
															successNotifier("Cart updated");
														}}
													>
														<IconPlus size="1.125rem" />
													</ActionIcon>
												</Group>
												
												<div className="item-price">
                          <Title order={5}>R {item.price}</Title>
                        </div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
