/** @format */

import "./card.css";
import { LiaStarSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useAppContext } from "../../context/Context";

const Card = ({ product }) => {
	const {
		state: { cart },
		dispatch,
	} = useAppContext();
	console.log("cart", cart);
	return (
		<div className="product-card">
			<div className="img-container">
				<img src={product.image} alt="" />
			</div>
			<div className="details-container">
				<div className="details">
					<p className="p-title">{product.title}</p>
					<div className="ratings">
						<LiaStarSolid className="star1" />
						<LiaStarSolid className="star2" />
						<LiaStarSolid className="star3" />
						<LiaStarSolid className="star4" />
						<LiaStarSolid className="star5" />
					</div>
					<div className="price">
						<p>${product.price}</p>
					</div>
				</div>
				<div className="cart-btn">
					{cart.some((p) => p.id === product.id) ? (
						<button
						onClick={() =>
							dispatch({ type: "REMOVE_FROM_CART", payload: product })
						} className="remove-btn">
						REMOVE FROM CART
					</button>
					) : (
						<button
							onClick={() =>
								dispatch({ type: "ADD_TO_CART", payload: product })
							}>
							ADD TO CART
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
