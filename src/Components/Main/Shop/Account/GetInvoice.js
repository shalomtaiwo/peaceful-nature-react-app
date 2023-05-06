import React from "react";
import Logo from "../../../Header/Navbar/Assets/logo.png";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db, auth } from "../../../../Firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { upperFirst } from "@mantine/hooks";
import { Table, Flex, Button, LoadingOverlay } from "@mantine/core";
import ReactToPdf from "react-to-pdf";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Error from "../../../../Error";

export const GetInvoice = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const [orderDetails, setOrderDetails] = React.useState([]);
	const invoiceId = window.location.pathname.split("/").pop();
	const [value, loading] = useDocument(doc(db, "orders", invoiceId), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	React.useEffect(() => {
		const Order = [];
		Order.push(value?.data());
		setOrderDetails(Order);
	}, [value]);

	const ref = React.createRef();

	const goToDashboard = () => {
		navigate("/account/orders");
	};
	if (loading) {
		return <LoadingOverlay />;
	}

	if (!loading && !value?.data())
		return (
			<div>
				<Error />
			</div>
		);

	return (
		<div>
			<Flex
				mih={150}
				gap="lg"
				bg="rgba(0, 0, 0, .03)"
				justify="center"
				align="center"
				direction="row"
				wrap="wrap"
				style={{
					padding: "20px",
				}}
			>
				<Button
					leftIcon={<IconArrowLeft />}
					variant={"filled"}
					color="lime"
					onClick={goToDashboard}
				>
					Go back
				</Button>
				<Flex
					Justify="center"
					align="center"
					gap="lg"
					direction="row"
					wrap="wrap"
				>
					<ReactToPdf
						targetRef={ref}
						onComplete={(e) => console.log(ref)}
						filename={`PeacefulNature-Invoice-${invoiceId}`}
						x={1.2}
						y={1.2}
						scale={1.14}
					>
						{({ toPdf }) => (
							<Button
								onClick={toPdf}
								color="lime"
								variant="light"
							>
								Download Invoice
							</Button>
						)}
					</ReactToPdf>
				</Flex>
			</Flex>
			<div
				ref={ref}
				style={{
					display: "flex",
					justifyContent: "center",
					maxWidth: "700px",
					width: "100%",
					margin: "30px auto",
				}}
			>
				<div
					className="container"
					style={{
						padding: " 15px 15px 30px 15px",
						borderRadius: "8px",
						border: "1px solid #f0f0f0",
					}}
				>
					<table
						width="100%"
						style={{
							padding: "15px",
						}}
					>
						<tbody>
							<tr>
								<td
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<div className="logotype">
										<img
											src={Logo}
											alt="Logo"
											width={60}
										/>
									</div>
									<div style={{ fontWeight: "bold", letterSpacing: "-1px" }}>
										Invoice
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<br />
					<table
						width="100%"
						style={{ borderCollapse: "collapse", padding: "15px" }}
					>
						<tbody>
							<tr>
								{orderDetails?.map((details) => {
									return (
										<>
											<td
												width="50%"
												style={{ padding: "20px", width: "50%" }}
											>
												Hello, {user?.displayName}. Thank you for shopping from
												our store and for your order.
											</td>
											<td style={{ padding: "20px", textAlign: "right" }}>
												<strong>Order-nr:</strong> {details?.orderNo}
												<br />
												{details?.OrderDate}
											</td>
										</>
									);
								})}
							</tr>
						</tbody>
					</table>
					<br />
					<table
						width="100%"
						style={{
							background: "rgb(212,228,217, 0.3)",
							padding: "15px",
						}}
					>
						<tbody>
							<tr>
								<td>
									<table>
										<tbody>
											<tr>
												<td style={{ verticalAlign: "text-top" }}>
													<div
														style={{
															background:
																"#bdce63 url(https://cdn0.iconfinder.com/data/icons/commerce-line-1/512/comerce_delivery_shop_business-07-128.png)",
															width: "50px",
															height: "50px",
															marginRight: "10px",
															backgroundPosition: "center",
															backgroundSize: "42px",
														}}
													></div>
												</td>
												<td>
													<strong>Delivery</strong>
													{orderDetails?.map((order, index) => {
														return (
															<p key={index}>
																{Array.isArray(order?.address)
																	? upperFirst(order?.address?.join("\n\r"))
																	: upperFirst(order?.address)}
															</p>
														);
													})}
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<br />
					<div
						style={{
							padding: "10px 15px",
						}}
					>
						<Table
							verticalSpacing="lg"
							striped
							highlightOnHover
							withColumnBorders
							width="100%"
							style={{
								borderCollapse: "collapse",
								borderBottom: "1px solid #eee",
							}}
						>
							<thead>
								<tr>
									<th
										width="40%"
										className="column-header"
									>
										Product
									</th>
									<th
										width="20%"
										className="column-header"
									>
										Quantity
									</th>
									<th
										width="20%"
										className="column-header"
									>
										Price
									</th>
									<th
										width="20%"
										className="column-header"
									>
										Total
									</th>
								</tr>
							</thead>
							<tbody>
								{orderDetails?.map((order) => {
									return (
										<>
											{order?.products?.map((product) => {
												return (
													<tr>
														<td className="row">{product?.title}</td>
														<td className="row">{product?.quantity}</td>
														<td className="row">R {product?.price}</td>
														<td className="row">R {product?.itemTotal}</td>
													</tr>
												);
											})}
										</>
									);
								})}
							</tbody>
						</Table>
						<br />
					</div>
					<table
						width="100%"
						style={{ padding: "20px" }}
					>
						<tbody>
							<tr>
								<td>
									<table
										width="300px"
										style={{ float: "right" }}
									>
										<tbody>
											<tr>
												<td>
													<strong>Sub-total:</strong>
												</td>
												<td style={{ textAlign: "right" }}>
													{orderDetails?.map((order) => {
														return <>R {order?.subTotal}</>;
													})}
												</td>
											</tr>
											<tr>
												<td>
													<strong>Shipping fee:</strong>
												</td>
												<td style={{ textAlign: "right" }}>
													{orderDetails?.map((order) => {
														return <>R {order?.shippingTotal}</>;
													})}
												</td>
											</tr>
											<tr>
												<td>
													<strong>Grand total:</strong>
												</td>
												<td style={{ textAlign: "right" }}>
													{orderDetails?.map((order) => {
														return <>R {order?.Total}</>;
													})}
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<div
						className="alert"
						style={{ background: "rgb(212,228,217, 0.3)", padding: "20px" }}
					>
						IMPORTANT: The contents of this email and any attachments are
						confidential. They are intended for the named recipient(s) only. If
						you have received this email by mistake, please notify the sender
						immediately and do not disclose the contents to anyone or make
						copies thereof.
					</div>
					<div
						className="socialmedia"
						style={{ padding: "20px 20px 0 20px" }}
					>
						Follow us online <small>[FB] [INSTA]</small>
					</div>
				</div>
			</div>
		</div>
	);
};
