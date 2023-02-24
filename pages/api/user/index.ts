import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash } from 'bcrypt';

import IUser from '@/interfaces/IUser';
import exclude from '@/lib/exclude';
import userSchema from '@/schema/userSchema';
import client from '@/prisma/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// post: /api/user
	if (req.method === 'POST') {
		// get data from user
		const data: IUser = req.body;

		try {
			// validate user
			userSchema.validate(data);

			// hash password
			const hashedPassword = await hash(data.password, 10);

			// add new user to database
			const user = await client.user.create({
				data: {
					name: `${data.firstName} ${data.lastName}`,
					email: data.email,
					password: hashedPassword,
				},
			});

			// remove password before sending back to client
			const userWithoutPassword = exclude(user, ['password']);

			res.status(200).send(userWithoutPassword);
		} catch (error: any) {
			// check email is unique
			if (error instanceof PrismaClientKnownRequestError) {
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

export default handler;
