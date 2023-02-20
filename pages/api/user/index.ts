import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../prisma/client';
import { hash } from 'bcrypt';

type userProps = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get: /api/user
	if (req.method === 'GET') {
		try {
			const data = await prisma.user.findMany();

			res.status(200).send(data);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	// post: /api/user
	if (req.method === 'POST') {
		// get data from user
		const user: userProps = req.body;

		// hash password
		hash(user.password, 10, async function (err, hash) {
			try {
				// create new user and add to postgres database
				const data = await prisma.user.create({
					data: {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						password: hash,
					},
				});

				res.status(200).send(data);
			} catch (error) {
				res
					.status(500)
					.send({ message: 'Error: Failed to create new user.', error });
			}
		});
	}
}
