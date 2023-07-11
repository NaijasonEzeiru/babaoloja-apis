// import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// const jwt = require('jsonwebtoken');

// export const verifyToken = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const token = req?.headers?.cookie?.match(
// 		new RegExp('(^| )' + 'access_token' + '=([^;]+)')
// 	)?.[2];
// 	console.log(token);
// 	if (!token) {
// 		return res.json({
// 			message: 'No token found',
// 			isLoggedIn: false
// 		});
// 	}
// 	jwt.verify(token, process.env.JWT_SECRET, (err: {} | null, user) => {
// 		if (err) res.status(403).json('failed to authenticate');
// 		req.user = user;
// 		next();
// 	});
// };

// export const verifyTokenAndAuth = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	verifyToken(req, res, () => {
// 		if (req.user.id == req.params.id || req.user.role === 'admin') {
// 			next();
// 		} else {
// 			res.status(403).json('You are not authorised for this action');
// 		}
// 	});
// };

// export const verifyAdmin = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	verifyToken(req, res, () => {
// 		if (req.user.role === 'admin') {
// 			next();
// 		} else {
// 			res.status(403).json('You are not authorised for this action');
// 		}
// 	});
// };
