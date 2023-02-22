import type { NextApiRequest, NextApiResponse } from 'next';

import { Prisma } from '@prisma/client';
import { prisma } from '../../../prisma/client';
import { hashSync } from 'bcrypt';

import exclude from '@/lib/exclude';
import IUser from '@/interfaces/IUser';
import userSchema from '@/schema/userSchema';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get: /api/user
	if (req.method === 'GET') {
		try {
			const data = await prisma.user.findMany();

			// remove password before sending back to client
			data.forEach(user => {
				exclude(user, ['password']);
			});

			res.status(200).send(data);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	// post: /api/user
	if (req.method === 'POST') {
		// get data from user
		const data: IUser = req.body;

		try {
			// validate user
			await userSchema.validate(data);

			// hash password
			const hashedPassword = hashSync(data.password, 10);

			// add new user to database
			const user = await prisma.user.create({
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					password: hashedPassword,
				},
			});

			// remove password before sending back to client
			const userWithoutPassword = exclude(user, ['password']);

			res.status(200).send(userWithoutPassword);
		} catch (error: any) {
			// check email is unique
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					res.status(400).send({
						message: 'A new user cannot be created with this email.',
					});
				}
			}

			// check for any validation errors
			if (error.message) {
				res.status(400).send({ message: error.message });
			}

			res.status(500).send({ message: 'Failed to create new user.' });
		}
	}
}
