import { Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import CryptoJS from 'crypto-js';
import { config } from 'dotenv';

import { users } from '../db/schema/schema.js';
import { db } from '../db/db.js';

config();

export const getUser = async (req: Request, res: Response) => {
	try {
		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.id, +req.params.id));
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({ err, message: 'User not found' });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	if (req.body.password) {
		req.body.password = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASSWORD_SECRET!
		).toString();
	}
	const { ...all } = req.body;
	console.log(all);
	try {
		const [updatedUser] = await db
			.update(users)
			.set({})
			.where(eq(users.id, +req.params.id))
			.returning({});
		// const updatedUser = await prisma.user.update({
		// 	where: {
		// 		id: +req.params.id
		// 	},
		// 	data: all
		// });
		res.status(201).json(updatedUser);
	} catch (err) {
		res.status(500).json({ err, message: 'Operation failed' });
	}
};
