import Cart from "./Cart";
import Checkout from "../Checkout/Checkout";
import { useState, createContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
	Stepper,
	Button,
	Group,
	TextInput,
	Stack,
	LoadingOverlay,
	Image,
	Modal,
	Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../Firebase-config";
import { PaystackConsumer } from "react-paystack";
import { useRef } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { AuthenticationForm } from "../Account/UserState/Login";
import ReviewTotal from "../Checkout/ReviewTotal";
import useAxios from "../../../../hooks/useAxios";

export const DeliveryContext = createContext();

export default function BasicTabs() {
	const { items, isEmpty, cartTotal, emptyCart, totalUniqueItems, totalItems } =
		useCart();
	const [user, loading] = useAuthState(auth);
	const [value, setValue] = useState(null);

	const [active, setActive] = useState(0);
	const [visible, { toggle }] = useDisclosure(false);

	const publicKey = process.env.REACT_APP_PAYSTACK_KEY;
	const amount = cartTotal * 100 + value * 100;
	const currency = "ZAR";

	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	function generateString(length) {
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return "PE-" + result;
	}

	const collectionAddress = {
		street_address: "14a Parklands Main road",
		local_area: "Parklands",
		company: "Peaceful Nature",
		city: "Cape Town",
		country: "ZA",
		code: "7441",
	};

	const checkoutstep = useForm({
		initialValues: {
			profile: {
				fullName: "",
				email: "",
				number: 0,
			},
			address: {
				street_address: "",
				local_area: "",
				company: "",
				city: "",
				country: "ZA",
				code: "",
			},
		},

		validate: (values) => {
			if (active === 1) {
				return {
					number:
						/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
							values.profile.number
						)
							? null
							: "Invalid phone number",
				};
			}
			if (active === 2) {
				return {
					street_address:
						values.address.street_address === "" || null
							? "Street address is required"
							: null,
					local_area:
						values.address.local_area === "" || null
							? "Local area is required"
							: null,
					city: values.address.city === "" || null ? "City is required" : null,
					code:
						values.address.code === "" || null
							? "Postal code is required"
							: null,
				};
			}
			return {};
		},
	});

	const nextStep = () =>
		setActive((current) => {
			if (checkoutstep.validate().hasErrors) {
				return current;
			}
			return current < 5 ? current + 1 : current;
		});

	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	let navigate = useNavigate();
	function shopping() {
		navigate("/shop");
	}

	const form = useRef();

	const config = {
		reference: new Date().getTime().toString(),
		email: user?.email,
		amount,
		currency,
		metadata: {
			custom_fields: [
				{
					display_name: "Full name",
					variable_name: "Full name",
					value: user?.displayName,
				},
				{
					display_name: "Phone",
					variable_name: "Phone",
					value: checkoutstep.values.profile.number,
				},
			],
		},
		publicKey,
	};

	const orderCollectionRef = collection(db, "orders");
	const addressCollectionRef = collection(db, "addresses");

	const { mutateAsync } = useAxios();

	const item = items?.map((product) => {
		const newItem = {
			description: product.short_desc,
			sku: product.slug,
			qty: product.quantity,
			vendor: "Peaceful Nature",
			unit_price: product.price,
			unit_weight_kg: 0.4,
		};
		return newItem;
	});

	const createOrder = async () => {
		const body = {
			customer_name: user?.displayName,
			customer_surname: user?.displayName,
			customer_email: user?.email,
			customer_phone: checkoutstep.values.profile.number,
			currency: "ZAR",
			buyer_selected_shipping_cost: parseInt(value),
			buyer_selected_shipping_method: "Standard Shipping",
			delivery_address: checkoutstep.values.address,
			order_items: item,
			payment_status: "paid",
		};
		var today = new Date();
		var year = today.getFullYear();
		var mes = today.getMonth() + 1;
		var dia = today.getDate();
		var fetchDate = dia + "-" + mes + "-" + year;
		toggle();

		const options = {
			url: "https://api.sandbox.bobgo.co.za/v2/orders?account_id=192",
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				Authorization: "Bearer 607cdd7584a0474a98af798c8e3f6ca1",
			},
			body,
		};
		try {
			mutateAsync(options).then(() => {
				try {
					addDoc(orderCollectionRef, {
						userID: user?.uid,
						Phone: checkoutstep.values.profile.number,
						products: items,
						address: checkoutstep.values.address,
						orderNo: generateString(8),
						OrderDate: fetchDate,
						delivery_status: "Processing",
						tracking: "processing",
						subTotal: cartTotal,
						shippingTotal: parseInt(value),
						Total: cartTotal + parseInt(value),
						timestamp: serverTimestamp(),
					})
						.then(function (res) {
							emailjs
								.sendForm(
									process.env.REACT_APP_EMAILJS_SERVICE,
									process.env.REACT_APP_EMAILJS_TEMPLATE,
									form.current,
									process.env.REACT_APP_EMAILJS_API
								)
								.then(
									() => {
										navigate(`/account/orders/${res?._key?.path?.segments[1]}`);
										emptyCart();
									},
									(error) => {
										console.log(error.text);
									}
								);
						})
						.catch(function (err) {
							console.log(err);
						});
				} catch (error) {
					console.log(error);
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	const createAddress = async () => {
		if (
			checkoutstep.values.address.street_address !== "" &&
			checkoutstep.values.address.local_area !== "" &&
			checkoutstep.values.address.city !== "" &&
			checkoutstep.values.address.code !== ""
		) {
			try {
				addDoc(addressCollectionRef, {
					address: checkoutstep.values.address,
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	// you can call this function anything
	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const componentProps = {
		...config,
		text: "Pay with PayStack",
		onSuccess: () => createOrder(),
		onClose: onClose,
	};

	function handleSubmit(e) {
		e.preventDefault();
	}

	const topChildren = () => {
		return (
			<div className="cart-main-header">
				<p className="cart-heading">
					Cart ({totalUniqueItems}) total Items: ({totalItems}){" "}
				</p>
				<Button
					variant="light"
					color="red"
					onClick={() => {
						emptyCart();
					}}
				>
					Clear Cart
				</Button>
			</div>
		);
	};

	if ((!user && loading) || (user && loading) || loading)
		return <div>Loading...</div>;

	if (!user && !loading)
		return (
			<div className="loginPage">
				<div className="authPage">
					<AuthenticationForm />
				</div>
			</div>
		);

	if (isEmpty)
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "30px 0",
					textAlign: "center",
				}}
			>
				<h2>Your Cart is Empty</h2>
				<svg
					width={"250px"}
					xmlns="http://www.w3.org/2000/svg"
					data-name="Layer 1"
					viewBox="0 0 650 512"
				>
					<circle
						cx="337.969"
						cy="243.395"
						r="167.695"
						fill="#dbe8ec"
					/>
					<path
						fill="#dbe8ec"
						d="M574.58343,223.75715V205.64747a13.02087,13.02087,0,0,0-13.02086-13.02087H505.60333a13.02086,13.02086,0,0,1-13.02086-13.02086V161.49606a13.02087,13.02087,0,0,1,13.02086-13.02087h21.45112a13.02087,13.02087,0,0,0,13.02086-13.02087V117.34464a13.02087,13.02087,0,0,0-13.02086-13.02087H143.13523a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968a13.02087,13.02087,0,0,0,13.02087,13.02087h0a13.02087,13.02087,0,0,1,13.02086,13.02087v18.10968a13.02086,13.02086,0,0,1-13.02086,13.02086H82.7824a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968A13.02087,13.02087,0,0,0,82.7824,236.778h59.75769A13.02087,13.02087,0,0,1,155.561,249.79889v18.10976c.31905,16.57135-35.82964,13.02087-43.02086,13.02087h-.04775a13.02087,13.02087,0,0,0-13.02087,13.02087V312.06a13.02087,13.02087,0,0,0,13.02087,13.02087h32.85852a13.02087,13.02087,0,0,1,13.02087,13.02087v18.10976a13.02087,13.02087,0,0,1-13.02087,13.02087H108.43743a13.02087,13.02087,0,0,0-13.02086,13.02087V400.3629a13.02086,13.02086,0,0,0,13.02086,13.02086H524.045a13.02087,13.02087,0,0,0,13.02087-13.02086V382.25322A13.02087,13.02087,0,0,0,524.045,369.23235H502.75526a13.02087,13.02087,0,0,1-13.02087-13.02087V338.10172a13.02087,13.02087,0,0,1,13.02087-13.02087h36.62008A13.02087,13.02087,0,0,0,552.39621,312.06V293.95039a13.02087,13.02087,0,0,0-13.02087-13.02087H521.30005a13.02087,13.02087,0,0,1-13.02087-13.02087V249.79889A13.02087,13.02087,0,0,1,521.30005,236.778h40.26252A13.02087,13.02087,0,0,0,574.58343,223.75715Z"
					/>
					<circle
						cx="340.677"
						cy="148.55"
						r="46.959"
						fill="#3086a3"
					/>
					<path
						fill="none"
						stroke="#f9ae2b"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="4"
						d="M324.05253,138.77179q-.00092-.08715-.00092-.17432a16.62566,16.62566,0,1,1,16.86682,16.62391v15.09678"
					/>
					<line
						x1="419.668"
						x2="451.971"
						y1="116.939"
						y2="116.939"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="419.668"
						x2="451.971"
						y1="126.25"
						y2="126.25"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="419.668"
						x2="451.971"
						y1="135.56"
						y2="135.56"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="119.153"
						x2="151.456"
						y1="293.762"
						y2="293.762"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="119.153"
						x2="151.456"
						y1="303.072"
						y2="303.072"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="119.153"
						x2="151.456"
						y1="312.383"
						y2="312.383"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="481.64"
						x2="513.943"
						y1="360.156"
						y2="360.156"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="481.64"
						x2="513.943"
						y1="369.467"
						y2="369.467"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<line
						x1="481.64"
						x2="513.943"
						y1="378.777"
						y2="378.777"
						fill="none"
						stroke="#3086a3"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="3"
					/>
					<circle
						cx="520.577"
						cy="300.496"
						r="13.807"
						fill="#b9d4db"
					/>
					<circle
						cx="484.141"
						cy="310.461"
						r="7.159"
						fill="#b9d4db"
					/>
					<circle
						cx="502.32"
						cy="266.711"
						r="10.228"
						fill="#b9d4db"
					/>
					<circle
						cx="206.393"
						cy="389.674"
						r="16.428"
						fill="#b9d4db"
					/>
					<circle
						cx="175.001"
						cy="377.974"
						r="8.557"
						fill="#b9d4db"
					/>
					<circle
						cx="182.861"
						cy="348.886"
						r="4.936"
						fill="#b9d4db"
					/>
					<circle
						cx="210.185"
						cy="352.378"
						r="11.833"
						fill="#b9d4db"
					/>
					<circle
						cx="218.423"
						cy="143.059"
						r="16.428"
						fill="#b9d4db"
					/>
					<circle
						cx="219.09"
						cy="109.564"
						r="8.557"
						fill="#b9d4db"
					/>
					<circle
						cx="276.085"
						cy="114.564"
						r="7.406"
						fill="#b9d4db"
					/>
					<circle
						cx="249.141"
						cy="107.367"
						r="4.936"
						fill="#b9d4db"
					/>
					<circle
						cx="254.877"
						cy="134.31"
						r="11.833"
						fill="#b9d4db"
					/>
					<path
						fill="#409cb5"
						d="M480.85793,233.2431H202.6215L193.549,210.24282h287.309a2.72176,2.72176,0,0,1,2.72176,2.72176v17.55676A2.72176,2.72176,0,0,1,480.85793,233.2431Z"
					/>
					<path
						fill="#f9ae2b"
						d="M440.32266,354.08924H251.1267a4.53627,4.53627,0,0,1-4.24692-2.94208L202.6215,233.2431h268.547l-26.4204,117.30658A4.53627,4.53627,0,0,1,440.32266,354.08924Z"
					/>
					<path
						fill="#3086a3"
						d="M457.56233,293.66888c-19.355,1.24146-38.71,1.89087-58.065,2.33216-9.6775.27637-19.355.33777-29.03251.50036l-29.0325.16578q-29.0325.02636-58.065-.65723c-19.355-.43945-38.71-1.09216-58.065-2.34107,19.355-1.2489,38.71-1.90148,58.065-2.34106q29.03249-.65185,58.065-.6571l29.0325.16565c9.6775.16259,19.355.224,29.03251.50048C418.8523,291.778,438.20731,292.42755,457.56233,293.66888Z"
					/>
					<path
						fill="#3086a3"
						d="M419.70359 233.2431c-1.1026 10.54578-2.78772 20.96045-4.64789 31.33558q-2.82669 15.55462-6.30877 30.96154-3.46357 15.41108-7.56577 30.67835c-1.38006 5.08618-2.80926 10.16137-4.33484 15.21484-.78927 2.52075-1.54083 5.05-2.361 7.56384l-.632 1.90967a4.91879 4.91879 0 01-1.18194 1.85889 4.67456 4.67456 0 01-3.81363 1.32349 4.373 4.373 0 003.11981-1.90845 3.91413 3.91413 0 00.633-1.61035l.25211-1.93872c.3367-2.62269.742-5.22986 1.10959-7.84571.78815-5.21948 1.6727-10.41736 2.60638-15.60412q2.82738-15.55444 6.31671-30.95972 3.47562-15.40833 7.57367-30.67664C413.23631 253.37482 416.17866 243.24335 419.70359 233.2431zM311.58605 354.0893a4.68121 4.68121 0 01-3.92411-1.458 6.69642 6.69642 0 01-1.156-1.8822l-.89646-1.85706c-1.1946-2.47632-2.32068-4.97827-3.4844-7.46619-2.27786-4.9945-4.463-10.02368-6.60287-15.06994q-6.39166-15.14906-12.15434-30.53431-5.78044-15.37866-10.948-30.9873c-3.41577-10.41675-6.65956-20.89807-9.33894-31.59119 5.01886 9.815 9.47332 19.8418 13.75582 29.93323q6.391 15.14941 12.14673 30.53723 5.76888 15.38306 10.94045 30.99012c1.70927 5.20788 3.37323 10.43273 4.94449 15.69238.76086 2.63916 1.55934 5.26416 2.28932 7.91479l.54693 1.98828a5.88655 5.88655 0 00.66687 1.77539A4.37022 4.37022 0 00311.58605 354.0893z"
					/>
					<circle
						cx="298.105"
						cy="428.058"
						r="18.743"
						fill="#409cb5"
					/>
					<circle
						cx="298.105"
						cy="428.058"
						r="8.651"
						fill="#dbe8ec"
					/>
					<circle
						cx="406.224"
						cy="428.058"
						r="18.743"
						fill="#409cb5"
					/>
					<circle
						cx="406.224"
						cy="428.058"
						r="8.651"
						fill="#dbe8ec"
					/>
					<path
						fill="#3086a3"
						d="M343.09231,233.2431c1.83931,9.99671,3.08253,20.02881,4.14664,30.07178q1.55889,15.06646,2.44714,30.173.9072,15.1053,1.161,30.24952c.13792,10.098.0925,20.207-.55473,30.35193-1.84722-9.99622-3.09265-20.02833-4.15473-30.07129q-1.5582-15.06666-2.43905-30.17347-.89487-15.106-1.15285-30.25012C342.40978,253.49628,342.453,243.38739,343.09231,233.2431Z"
					/>
					<path
						fill="#409cb5"
						d="M437.93777,399.80133H268.38406a3.00011,3.00011,0,0,1-2.801-1.92578L167.38479,141.898H115.37112a3,3,0,0,1,0-6h54.07593a3.0001,3.0001,0,0,1,2.801,1.92578l98.19824,255.97754H437.93777a3,3,0,0,1,0,6Z"
					/>
					<rect
						width="39.6"
						height="18.36"
						x="103.858"
						y="130.248"
						fill="#409cb5"
						rx="2"
					/>
					<circle
						cx="340.677"
						cy="179.6"
						r="2.7"
						fill="#f9ae2b"
					/>
				</svg>
				<Button
					color={"lime"}
					onClick={shopping}
				>
					Go to Shop
				</Button>
			</div>
		);

	if (user)
		return (
			<>
				<LoadingOverlay
					visible={visible}
					overlayBlur={2}
					loaderProps={{ color: "green" }}
				/>
				<form
					ref={form}
					post="https://api.emailjs.com/api/v1.0/email/send"
					onSubmit={handleSubmit}
				>
					<Box sx={{ width: "100%", padding: "20px" }}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Stepper
								active={active}
								breakpoint="sm"
								color={"lime"}
							>
								<Stepper.Step
									label="Cart"
									description="Your cart"
								>
									<div className="checkoutState">
										<div className="totalFlex flexAddress">
											<div className="addressFlex">
												<Cart />
											</div>
											<DeliveryContext.Provider
												value={{
													value,
													setValue,
												}}
											>
												<ReviewTotal
													childrenTop={topChildren()}
													summaryClass={"orderDisplay"}
													reviewClass={"addressTotal"}
													style={{
														backgroundColor: "rgb(238,238,238, 0.5)",
														borderRadius: "10px",
													}}
												/>
											</DeliveryContext.Provider>
										</div>
									</div>
								</Stepper.Step>

								<Stepper.Step
									label="Checkout"
									description="Billing details"
								>
									<div className="checkoutState">
										<div className="totalFlex flexAddress">
											<Stack className="addressFlex">
												<TextInput
													label="Full Name"
													value={user?.displayName}
													placeholder="John Doe"
													onChange={(event) =>
														checkoutstep.setFieldValue(
															"profile.fullName",
															event.currentTarget.value
														)
													}
													error={
														checkoutstep.errors.fullName &&
														"Name must include at least 2 characters"
													}
												/>
												<TextInput
													label="Email"
													value={user?.email}
													placeholder="email@email.com"
													onChange={(event) =>
														checkoutstep.setFieldValue(
															"profile.email",
															event.currentTarget.value
														)
													}
													error={checkoutstep.errors.email && "Invalid email"}
												/>

												<TextInput
													required
													label="Phone number"
													value={checkoutstep.values.profile.number}
													placeholder="00 111 2222"
													onChange={(event) =>
														checkoutstep.setFieldValue(
															"profile.number",
															event.currentTarget.value
														)
													}
													error={
														checkoutstep.errors.number && "Invalid phone number"
													}
												/>
												<TextInput
													required
													label="Country"
													value={checkoutstep.values.address.country}
													placeholder="ZA"
													disabled
													onChange={(event) =>
														checkoutstep.setFieldValue(
															"address.country",
															event.currentTarget.value
														)
													}
													error={
														checkoutstep.errors.code && "Country is required"
													}
												/>
											</Stack>
											<DeliveryContext.Provider
												value={{
													value,
													setValue,
												}}
											>
												<ReviewTotal reviewClass={"addressTotal"} />
											</DeliveryContext.Provider>
										</div>
									</div>
								</Stepper.Step>

								<Stepper.Step
									label="Address"
									description="Shipping Address"
								>
									<div className="checkoutState">
										<div className="totalFlex flexAddress">
											<div className="addressFlex">
												<Button color="lime">Add Address</Button>
												<Stack></Stack>
											</div>

											<Modal opened={false}>
												<Stack>
													<TextInput
														required
														label="Street address"
														value={checkoutstep.values.address.street_address}
														placeholder="5 Cape Town Street"
														onChange={(event) =>
															checkoutstep.setFieldValue(
																"address.street_address",
																event.currentTarget.value
															)
														}
														error={
															checkoutstep.errors.street_address &&
															"Street address is required"
														}
													/>
													<TextInput
														label="Company (optional)"
														value={checkoutstep.values.address.company}
														placeholder="John Doe LTD"
														onChange={(event) =>
															checkoutstep.setFieldValue(
																"address.company",
																event.currentTarget.value
															)
														}
													/>
													<TextInput
														required
														label="Local Area"
														value={checkoutstep.values.address.local_area}
														placeholder="Goodwood"
														onChange={(event) =>
															checkoutstep.setFieldValue(
																"address.local_area",
																event.currentTarget.value
															)
														}
														error={
															checkoutstep.errors.local_area &&
															"Local Area is required"
														}
													/>
													<TextInput
														required
														label="City"
														value={checkoutstep.values.address.city}
														placeholder="Cape Town"
														onChange={(event) =>
															checkoutstep.setFieldValue(
																"address.city",
																event.currentTarget.value
															)
														}
														error={
															checkoutstep.errors.city && "City is required"
														}
													/>
													<TextInput
														required
														label="Postal code"
														value={checkoutstep.values.address.code}
														placeholder="7800"
														onChange={(event) =>
															checkoutstep.setFieldValue(
																"address.code",
																event.currentTarget.value
															)
														}
														error={
															checkoutstep.errors.code &&
															"Postal code is required"
														}
													/>
													<Button
														color="lime"
														onClick={createAddress}
													>
														Save Address
													</Button>
												</Stack>
											</Modal>
											<DeliveryContext.Provider
												value={{
													value,
													setValue,
												}}
											>
												<ReviewTotal reviewClass={"addressTotal"} />
											</DeliveryContext.Provider>
										</div>
									</div>
								</Stepper.Step>

								<Stepper.Completed label="Final step">
									<DeliveryContext.Provider
										value={{
											value,
											setValue,
										}}
									>
										<Checkout
											deliveryAddress={checkoutstep.values.address}
											collectionAddress={collectionAddress}
											number={checkoutstep.values.profile.number}
											profile={user}
											items={items}
										>
											{value !== "" && (
												<PaystackConsumer {...componentProps}>
													{({ initializePayment }) => (
														<Button
															variant="gradient"
															gradient={{ from: "teal", to: "lime", deg: 105 }}
															fullWidth
															height={50}
															onClick={() =>
																initializePayment(createOrder, onclose)
															}
														>
															<Image
																maw={24}
																src={
																	"https://res.cloudinary.com/dg8os5pul/image/upload/v1678644906/Paystack-mark-white-twitter_cqzrec.png"
																}
															/>
															<p className="paywith">Pay with PayStack</p>
														</Button>
													)}
												</PaystackConsumer>
											)}
										</Checkout>
									</DeliveryContext.Provider>
								</Stepper.Completed>
							</Stepper>

							<Group
								position="right"
								mt="xl"
								style={{
									paddingBottom: "20px",
								}}
							>
								{active !== 0 && (
									<Button
										color={"lime"}
										variant="light"
										onClick={prevStep}
									>
										Back
									</Button>
								)}
								{active !== 3 && (
									<Button
										color="lime"
										onClick={nextStep}
									>
										Next step
									</Button>
								)}
							</Group>
						</Box>
					</Box>
				</form>
			</>
		);
}
