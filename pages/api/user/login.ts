import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../prisma/client';
import nc from 'next-connect';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import IUser from '@/interfaces/IUser';

const handler = nc<NextApiRequest, NextApiResponse>({
	onError: (err, req, res, next) => {
		console.error(err.stack);
		res.status(500).end('Sorry, something went wrong!');
	},
	onNoMatch: (req, res) => {
		res.status(404).end('Sorry, that page was not found!');
	},
})
	// post: /api/user/login
	.post(async (req, res) => {
		// get data from user
		const { email, password }: IUser = req.body;

		try {
			// find user or throw error if not found
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					email,
				},
			});

			// check password is correct
			compare(password, user.password, function (err, result) {
				if (!err && result) {
					// generate jwt
					const data = {
						id: user.id,
						email: user.email,
					};
					const secret = process.env.JWT_SECRET!;
					const token = sign(data, secret);

					res.status(200).send(token);
				} else {
					res.status(401).send({ message: 'Failed to authenticate user.' });
				}
			});
		} catch (error) {
			res.status(500).send({ message: 'Sorry, something went wrong.' });
		}
	});

export default handler;
