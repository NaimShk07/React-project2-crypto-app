import {
	Box,
	Container,
	HStack,
	Heading,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../main";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchange = () => {
	const [exchangeArr, setexchangeArr] = useState([]);
	const [loading, setloading] = useState(true);
	const [error, seterror] = useState(false);

	useEffect(() => {
		fetchExchange();
	}, []);

	const fetchExchange = async () => {
		try {
			const { data } = await axios.get(`${server}/exchanges`);
			setexchangeArr(data);
			setloading(false);
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	};

	if (error)
		return <ErrorComponent message={"Error while fetching Exchanges"} />;

	return (
		<Container maxW={"container.xl"}>
			{loading ? (
				<Loader />
			) : (
				<>
					<HStack wrap={"wrap"} justifyContent={"space-evenly"}>
						{exchangeArr.map((val, index) => (
							<ExchangeCard
								key={index}
								name={val.name}
								img={val.image}
								rank={val.trust_score_rank}
								url={val.url}
							/>
						))}
						data
					</HStack>
				</>
			)}
		</Container>
	);
};

const ExchangeCard = ({ name, img, url, rank }) => {
	return (
		<a href={url} target="_blank">
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
					{rank}
				</Heading>
				<Text noOfLines={1}>{name}</Text>
			</VStack>
		</a>
	);
};

export default Exchange;
