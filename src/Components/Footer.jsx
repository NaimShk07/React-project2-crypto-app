import { Box, Center, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";


const Footer = () => {
	return (
		<Box
			w={"full"}
			minH={"40"}
			bgColor={"blackAlpha.900"}
			color={"white"}
			px={"16"}
			py={["16", "10"]}
		>
			<Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
				<VStack alignItems={["center", "flex-start"]} w={"full"}>
					<Heading fontSize={"xl"}>About us</Heading>
					<Text textAlign={["center", "left"]}>
						We are the best crypto trading app in India, we provide out guidance
						at a very cheap price.
					</Text>
				</VStack>
				<VStack></VStack>
			</Stack>
		</Box>
	);
};

export default Footer;
