import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Coins from "./Components/Coins";
import Exchange from "./Components/Exchange";
import CoinDetail from "./Components/CoinDetail";

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/coins" element={<Coins />} />
				<Route path="/coins/:id" element={<CoinDetail />} />
				<Route path="/exchange" element={<Exchange />} />
			</Routes>
		</Router>
	);
};

export default App;
