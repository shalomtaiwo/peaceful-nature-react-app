import React from "react";
import { Radio, Space, Stack, Text, Title } from "@mantine/core";
import { DeliveryContext } from "../Cart/Stepper";
import useAxios from "../../../../hooks/useAxios";
import "./Checkout.css";
import ReviewTotal from "./ReviewTotal";

export default function Checkout({
	items,
	children,
	number,
	profile,
	deliveryAddress,
	collectionAddress,
}) {
	const { value, setValue } = React.useContext(DeliveryContext);
	const { data, error, isLoading, mutateAsync } = useAxios();

	const item = items?.map((product) => {
		const newItem = {
			qty: product.quantity,
			vendor: "Peaceful Nature",
			unit_price: product.price,
			unit_weight_kg: 0.4,
			image_url: product.img
		};
		return newItem;
	});

	const makeRequestForShalom = () => {
		const body = {
			collection_address: collectionAddress,
			delivery_address: deliveryAddress,
			items: item,
			handling_time: 24,
		};

		const options = {
			url: "https://api.sandbox.bobgo.co.za/v2/rates-at-checkout?account_id=192",
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				Authorization: `Bearer ${process.env.REACT_APP_UAFRICA_SECRET_KEY}`,
			},
			body,
		};

		mutateAsync(options).then((res) => {});
	};

	React.useEffect(() => {
		makeRequestForShalom();
	}, []);

	const getDeliveryRate = (service, price) => {
		return (
			<div className="delivery_choice">
				<span>{service}</span>
				<span>R{price}</span>
			</div>
		);
	};

	return (
		<div className="checkoutState">
			<div className="totalFlex">
				<div className="totalSection">
					{/* <div className="section_checkout" style={{
          marginBottom: '25px'
        }}>
            <Title order={4} >4. Payment</Title>
            <Space h="sm" />
              <Stack mt="md">

                <Radio
                  name="credit_card"
                  value={"credit_card"}
                  color="green"
                  label={'Credit Card'}
                  description="PayStack" />
              </Stack>
          </div> */}
					<div className="delivery">
						<Title order={4}>3. Delivery</Title>
						<Space h="sm" />
						{isLoading && <p>Loading</p>}
						{data && (
							<Radio.Group
								name="fdelivery"
								description="Delivery charges vary on locations"
								withAsterisk
								value={value}
								onChange={setValue}
							>
								<Stack mt="md">
									<Radio
										name="pick_up"
										value={"0"}
										key={0}
										color="green"
										label={getDeliveryRate("Collect", 0)}
										description="Collect from Checkpoint"
									/>

									{data?.data?.rates?.map((rate, index) => {
										return (
											<div>
												<Radio
													key={index + 1}
													name={rate.service_name}
													color="lime"
													description={
														"Should arrive - " +
														rate.min_delivery_date +
														" to " +
														rate.max_delivery_date
													}
													value={rate.total_price.toString()}
													label={getDeliveryRate(
														rate.service_name,
														rate.total_price
													)}
												/>
											</div>
										);
									})}
								</Stack>
							</Radio.Group>
						)}
					</div>
					<div className="section_checkout">
						<Title order={4}>2. Shipping</Title>
						<Space h="sm" />
						<Text>{deliveryAddress?.street_address}</Text>
						<Text>{deliveryAddress?.local_area}</Text>
						<Text>{deliveryAddress?.city}</Text>
						<Text>{deliveryAddress?.country}</Text>
					</div>
					<div className="section_checkout">
						<Title order={4}>1. Profile</Title>
						<Space h="sm" />
						<Text>{profile?.displayName}</Text>
						<Text>{profile?.email}</Text>
						<Text>{number}</Text>
					</div>
				</div>
				<ReviewTotal reviewClass={"reviewTotal"}>{children}</ReviewTotal>
			</div>
		</div>
	);
}
