// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../prisma/client';

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
	const user: userProps = JSON.parse(req.body);

	// get: /api/user
	if (req.method === 'GET') {
		try {
			const data = await prisma.user.findMany();

			return res.status(200).send(data);
		} catch (error) {
			return res.status(500).send(error);
		}
	}

	// post: /api/user
	if (req.method === 'POST') {
		try {
			const data = await prisma.user.create({
				data: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
				},
			});

			return res.status(200).send(data);
		} catch (error) {
			return res
				.status(500)
				.send({ message: 'Error: Failed to create new user.', error });
		}
	}
}
