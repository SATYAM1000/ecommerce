/** @format */

import { useEffect, useState } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppContext } from "../../context/Context";
import { FaFilter } from "react-icons/fa";

const Home = () => {
	const [products, setProducts] = useState([]);
	const { loading, setLoading, state,allProducts } = useAppContext();
	console.log("state",state);
	useEffect(()=>{
		console.log(state)
	},[state])
	// useEffect(() => {
	// 	const getAllProducts = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const response = await axios.get("https://fakestoreapi.com/products");
	// 			setLoading(false);
	// 			console.log(response.data);
	// 			setProducts(response.data);
	// 		} catch (error) {
	// 			setLoading(false);
	// 			console.log("Error while fetching data from server", error);
	// 		}
	// 	};
	// 	getAllProducts();
	// }, []);
	return (
		<div className="home-page">
			<div className="top">
				<h2>Featured</h2>
				<div className="filter-container">
					<FaFilter />
					<p>Filter</p>
				</div>
			</div>
			{loading ? (
				<div className="loader">
					<ClipLoader
						color="#3e5a94"
						loading={loading}
						size={100}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<>
					<div className="products-container">
						{allProducts.map((product) => {
							return <Card product={product} key={product.id} />;
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
