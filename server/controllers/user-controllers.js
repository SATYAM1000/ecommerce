/** @format */

import express from "express";
import UserModel from "../models/user-schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({ msg: "All fields are required" });
		}
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ msg: "User already exists" });
		}
		const newUser = new UserModel({ username, email, password });
		await newUser.save();
		return res.status(201).json({
			msg: "User registered successfully",
			token: await newUser.generateToken(),
		});
	} catch (error) {
		console.log("Error while registering", error);
		throw new Error("Something went wrong");
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await UserModel.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ msg: "User doesn't exist" });
		}
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}
		const token = await existingUser.generateToken();
		const userData = {
			_id: existingUser._id,
			username: existingUser.username,
			email: existingUser.email,
		};

		res.status(200).json({ token, msg: "Login successful", userData });
	} catch (error) {
		console.log("Error while logging in", error);
		throw new Error("Something went wrong");
	}
};
