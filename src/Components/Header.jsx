import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<HStack
			bgColor={"blackAlpha.900"}
			color={"white"}
			p={4}
         pl={6}
			shadow={"base"}
			spacing={8}
		>
			<Button variant={"unstyled"}>
				<Link to={"/"}>Home</Link>
			</Button>
			<Button variant={"unstyled"}>
				<Link to={"/exchange"}>Exchange</Link>
			</Button>
			<Button variant={"unstyled"}>
				<Link to={"/coins"}>Coins</Link>
			</Button>
		</HStack>
	);
};

export default Header;
