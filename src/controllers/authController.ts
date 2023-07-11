import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import { users } from '../db/schema/schema.js';
import { db } from '../db/db.js';

// import { Client } from 'pg';

// const client = new Client({
// 	connectionString: 'postgres://user:password@host:port/db'
// });

// await client.connect();
// const db = drizzle(client)

config();

const registerUser = async (req: Request, res: Response) => {
	// Extract the values from the request
	const { password, firstName, lastName, email, phone } = req.body;

	// check if all required fields are provided
	if (!password || !firstName || !lastName || !email || !phone) {
		// if all fields are not provided, return a 409 response with an error message
		return res.status(422).json({ message: 'All fields are required' });
	} else {
		// Check if there is an existing user with the same email address
		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.email, email));
		if (existingUser) {
			// If a user with the same email exists, return a 409 response with an error message
			return res
				.status(409)
				.json({ message: 'This email address is already taken' });
		}
		try {
			// Hash the password with cryptoJS and create a new User
			const register = await db
				.insert(users)
				.values({
					passwordHash: CryptoJS.AES.encrypt(
						password,
						process.env.PASSWORD_SECRET!
					).toString(),
					email: email.toLowerCase(),
					firstName,
					lastName,
					phone
				})
				.returning();
			const { passwordHash, ...rest } = register[0];
			res.status(201).json({ ...rest });
		} catch (error) {
			console.log(error);
			// if (error.code === 'P2002') {
			// 	return res.status(401).json({
			// 		emailError: 'A user with this email already exists'
			// 	});
			// }
			// res.status(500).json({ error, message: error.message });
		}
	}
};

const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.email, email.toLowerCase()));
		if (!user) {
			return res
				.status(401)
				.json({ emailError: 'This email address is not registered' });
		}
		const { passwordHash, ...rest } = user;
		const unhashedPassword = CryptoJS.AES.decrypt(
			passwordHash,
			process.env.PASSWORD_SECRET!
		).toString(CryptoJS.enc.Utf8);
		if (password !== unhashedPassword) {
			return res.status(401).json({
				passwordError: 'This password is incorrect'
			});
		} else {
			const accessToken = jwt.sign(
				{
					id: rest.id,
					role: rest.role
				},
				process.env.JWT_SECRET!,
				{ expiresIn: '3d' }
			);
			res.cookie('access_token', accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production'
			})
				.status(201)
				.json({ ...rest, Message: 'logged in successfully' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
};

const me = async (req: Request, res: Response) => {
	const token = req?.headers?.cookie?.match(
		new RegExp('(^| )' + 'access_token' + '=([^;]+)')
	)?.[2];
	if (token) {
		const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
		const { id } = decodedToken;
		if (!id) {
			return res
				.status(200)
				.json({ success: false, message: 'invalid token' });
		}
		try {
			const [user] = await db
				.select()
				.from(users)
				.where(eq(users.id, id));
			// !user && res.status(401).json('Email address is not registered');
			if (!user) {
				console.log('no user');
				return res
					.status(401)
					.json({ message: 'Email address is not registered' });
			}
			const { passwordHash, ...rest } = user;
			const accessToken = jwt.sign(
				{
					id: rest.id,
					role: rest.role
				},
				process.env.JWT_SECRET!,
				{ expiresIn: '14d' }
			);
			return res
				.cookie('access_token', accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production'
				})
				.status(201)
				.json({ ...rest });
		} catch (err) {
			console.error(err);
			return res.status(500).json(err);
		}
	}
	return res.status(200).json({
		success: false,
		message: 'Error! persist token was not provided'
	});
};

const logoutUser = (_req: Request, res: Response) => {
	return res
		.clearCookie('access_token')
		.status(200)
		.json({ message: 'You have successfully logged out' });
};

export { registerUser, loginUser, me, logoutUser };
