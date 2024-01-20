/** @format */

import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleFormFieldsChange = (event) => {
		const { name, value } = event.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFormSubmit = async (event) => {
		console.log("submitted");
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/users/register",
				user
			);
			if (response.status === 201) {
				toast.success(response.data.msg);
				setUser({
					username: "",
					email: "",
					password: "",
				});
				navigate("/login");
			} else {
				console.log("Something went wrong");
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log("Error while fetching data from server", error);
			toast.error(error.response.data.msg);
		}
	};
	return (
		<div className="register-page">
			<div className="form-wrapper">
				<h2 className="reg-h2">
					Register <span className="span-text">Here!</span>
				</h2>
				<form className="register-form" onSubmit={handleFormSubmit}>
					<div className="inputs-fields">
						<input
							name="username"
							value={user.username}
							type="text"
							placeholder="Username"
							autoComplete="off"
							onChange={handleFormFieldsChange}
						/>
						<input
							name="email"
							value={user.email}
							type="email"
							placeholder="Email"
							autoComplete="off"
							onChange={handleFormFieldsChange}
						/>
						<input
							name="password"
							value={user.password}
							type="password"
							placeholder="Password"
							autoComplete="off"
							onChange={handleFormFieldsChange}
						/>
					</div>
					<div className="button-field">
						<button type="submit">Register</button>
						<p className="already-reg">
							Already registered? <Link to="/login">Login</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
