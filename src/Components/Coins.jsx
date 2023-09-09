import {
	Container,
	HStack,
	Heading,
	Image,
	Button,
	Text,
	VStack,
	Radio,
	RadioGroup,
	Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../main";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";

const Coins = () => {
	const [coinsArr, setcoinsArr] = useState([]);
	const [loading, setloading] = useState(true);
	const [error, seterror] = useState(false);
	const [currency, setcurrency] = useState("inr");
	const [page, setpage] = useState(1);
	const currencySymbol =
		currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

	const changePage = (page) => {
		setpage(page);
		setloading(true);
	};

	const btns = new Array(132).fill(1);

	useEffect(() => {
		fetchCoins();
	}, [currency, page]);

	const fetchCoins = async () => {
		try {
			const { data } = await axios.get(
				`${server}/coins/markets?vs_currency=${currency}&page=${page}`
			);
			setcoinsArr(data);
			setloading(false);
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	};

	if (error) return <ErrorComponent message={"Error while fetching Coins"} />;

	return (
		<Container maxW={"container.xl"}>
			{loading ? (
				<Loader />
			) : (
				<>
					<RadioGroup onChange={setcurrency} value={currency} p={8} >
						<Stack direction="row" spacing={6}>
							<Radio value="inr">INR</Radio>
							<Radio value="usd">USD</Radio>
							<Radio value="eur">EUR</Radio>
						</Stack>
					</RadioGroup>
					<HStack wrap={"wrap"} justifyContent={"space-evenly"}>
						{coinsArr.map((val, index) => (
							<ExchangeCard
								key={index}
								img={val.image}
								symbol={val.symbol}
								name={val.name}
								price={val.current_price}
								id={val.id}
								// id={val.market_cap_rank}
								currencySymbol={currencySymbol}
							/>
						))}
						data
					</HStack>
					<HStack p={8} overflowX={"auto"}>
						{btns.map((val, index) => (
							<Button
								key={index}
								bgColor={"blackAlpha.900"}
								color={"white"}
								borderRadius={"full"}
								onClick={() => changePage(index + 1)}
							>
								{index + 1}
							</Button>
						))}
					</HStack>
				</>
			)}
		</Container>
	);
};

const ExchangeCard = ({ id, name, img, symbol, price, currencySymbol }) => {
	return (
		<Link to={`/coins/${id}`}>
			<VStack
				w={52}
				m={4}
				shadow={"lg"}
				p={8}
				borderRadius={"lg"}
				transition={"all .3s"}
				css={{
					"&:hover": {
						transform: "scale(1.1)",
					},
				}}
			>
				<Image
					src={img}
					w={"10"}
					h={"10"}
					objectFit={"contain"}
					alt={"Exchange"}
				/>
				<Heading size={"md"} noOfLines={1}>
					{symbol}
				</Heading>
				<Text noOfLines={1}>{name}</Text>
				<Text noOfLines={1}>
					{currencySymbol} {price}
				</Text>
			</VStack>
		</Link>
	);
};

export default Coins;
