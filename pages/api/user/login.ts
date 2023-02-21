import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import exclude from '@/lib/exclude';
import IUser from '@/interfaces/IUser';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// post: /api/user/login
	if (req.method === 'POST') {
		// get data from user
		const user: IUser = req.body;

		try {
			// find user account
			const currentUser = await prisma.user.findUniqueOrThrow({
				where: {
					email: user.email,
				},
			});

			// check password is correct
			compare(user.password, currentUser.password, function (err, result) {
				if (!err && result) {
					// generate jwt token
					const data = {
						id: currentUser.id,
						email: currentUser.email,
					};
					const secret = process.env.JWT_SECRET!;
					const token = sign(data, secret);

					res.status(200).send(token);
				} else {
					res.status(401).send({ message: 'Failed to authenticate user.' });
				}
			});
		} catch (error: any) {
			res.status(500).send({ message: 'Sorry, something went wrong.' });
		}
	}
}
