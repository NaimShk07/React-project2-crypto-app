import {
	Badge,
	Box,
	Button,
	Container,
	HStack,
	Image,
	Progress,
	Radio,
	RadioGroup,
	Stack,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetail = () => {
	const { id } = useParams();
	const [coinArr, setcoinArr] = useState([]);
	const [loading, setloading] = useState(true);
	const [error, seterror] = useState(false);
	const [currency, setcurrency] = useState("inr");

	const currencySymbol =
		currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

	// coindetail related
	const [chartArr, setchartArr] = useState([]);
	const [days, setdays] = useState("24h");
	const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

	useEffect(() => {
		fetchCoin();
	}, [id, days, currency]);

	const fetchCoin = async () => {
		try {
			const { data } = await axios.get(`${server}/coins/${id}`);
			const { data: chartData } = await axios.get(
				`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
			);
			setcoinArr(data);
			setchartArr(chartData.prices);
			setloading(false);
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	};

	if (error)
		return <ErrorComponent message={"Error while fetching Coin Detail"} />;

	return (
		<Container maxW={"container.xl"}>
			{loading ? (
				<Loader />
			) : (
				<>
					<Box w={"full"} borderWidth={1}>
						<Chart arr={chartArr} currency={currencySymbol} days={days} />
					</Box>

					{/* Button for chart */}
					<HStack p={4} wrap={"wrap"}>
						{btns.map((val, index) => (
							<Button
								isDisabled={days === val}
								key={index}
								onClick={() => {
									setdays(val);
									setloading(true);
								}}
							>
								{val}
							</Button>
						))}
					</HStack>

					<RadioGroup onChange={setcurrency} value={currency} p={8}>
						<Stack direction="row" spacing={6}>
							<Radio value="inr">INR</Radio>
							<Radio value="usd">USD</Radio>
							<Radio value="eur">EUR</Radio>
						</Stack>
					</RadioGroup>
					<VStack spacing={4} p={16} alignItems={"flex-start"}>
						<Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
							Last Upadated On{" "}
							{Date(coinArr.market_data.last_updated).split("G")[0]}
						</Text>

						<Image
							src={coinArr.image.large}
							h={16}
							w={16}
							objectFit={"contain"}
						/>

						<Stat>
							<StatLabel>{coinArr.name}</StatLabel>
							<StatNumber>
								{currencySymbol}
								{coinArr.market_data.current_price[currency]}
								{/* let a={ name:"naim"} a.name,a[name] */}
							</StatNumber>
							<StatHelpText>
								<StatArrow
									type={
										coinArr.market_data.price_change_percentage_24h > 0
											? "increase"
											: "decrease"
									}
								/>
								{coinArr.market_data.price_change_percentage_24h}%
							</StatHelpText>
						</Stat>

						<Badge fontSize={"2xl"} bgColor={"black"} color={"white"}>
							#{coinArr.market_cap_rank}
						</Badge>

						<CustomBar
							high={`${currencySymbol}${coinArr.market_data.high_24h[currency]}`}
							low={`${currencySymbol}${coinArr.market_data.low_24h[currency]}`}
						/>

						<VStack w={"full"} p={4}>
							<Item
								title={"Max supply"}
								value={
									coinArr.market_data.max_supply == null
										? "NAN"
										: coinArr.market_data.max_supply
								}
							/>
							<Item
								title={"Circulating supply"}
								value={coinArr.market_data.circulating_supply}
							/>
							<Item
								title={"Market cap"}
								value={`${currencySymbol}${coinArr.market_data.market_cap[currency]}`}
							/>
							<Item
								title={"All time low"}
								value={`${currencySymbol}${coinArr.market_data.ath[currency]}`}
							/>
							<Item
								title={"All time high"}
								value={`${currencySymbol}${coinArr.market_data.atl[currency]}`}
							/>
						</VStack>
					</VStack>
				</>
			)}
		</Container>
	);
};

const Item = ({ title, value }) => (
	<HStack justifyContent={"space-between"} w={"full"} my={4}>
		<Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
			{title}
		</Text>
		<Text>{value}</Text>
	</HStack>
);

const CustomBar = ({ high, low }) => (
	<VStack w={"full"}>
		<Progress value={50} colorScheme="teal" w={"full"} />

		<HStack w={"full"} justifyContent={"space-between"}>
			<Badge children={low} colorScheme="red" />
			<Text fontSize={"sm"}>24H Range</Text>
			<Badge children={high} colorScheme="green" />
		</HStack>
	</VStack>
);

export default CoinDetail;
