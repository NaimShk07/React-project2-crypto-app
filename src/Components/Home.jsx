import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcImg from "../Asset/btc.png";
import { motion } from "framer-motion";

const Home = () => {
	return (
		<Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
			<motion.div
				style={{
					height: "80vh",
				}}
				animate={{
					translateY: "20px",
				}}
				transition={{
					duration: "2",
					repeat: Infinity,
					repeatType: "reverse",
				}}
			>
				<Image w={"full"} h={"full"} objectFit={"contain"} src={btcImg} />
			</motion.div>

			<Text
				fontSize={"4xl"}
				textAlign={"center"}
				fontWeight={"thick"}
				mt={"-10"}
				color={"white"}
			>
				Xcrypto
			</Text>
		</Box>
	);
};

export default Home;
