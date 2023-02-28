import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import IUser from '@/interfaces/IUser';
import userSchema from '@/schema/userSchema';
import client from '@/prisma/client';
import sendVerificationEmail from '@/lib/sendVerificationEmail';

import { hash } from 'bcrypt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// post: /api/user
	if (req.method === 'POST') {
		// get data from user
		const data: IUser = req.body;

		try {
			await client.user.deleteMany();

			// validate user
			await userSchema.validate(data);

			// check if user already exists
			const exists = await client.user.findUnique({
				where: { email: data.email },
			});

			if (exists)
				throw new Error(
					'A user with that email is already registered with Contact Book.'
				);

			// hash password
			const hashedPassword = await hash(data.password, 10);

			// add new user to database
			const user = await client.user.create({
				data: {
					name: `${data.firstName} ${data.lastName}`,
					email: data.email,
					password: hashedPassword,
				},
				select: {
					id: true,
					name: true,
					email: true,
				},
			});

			// send verification email
			await sendVerificationEmail(user.email!);

			res.status(200).send(user);
		} catch (err) {
			const error = err as ApiError;

			if (error.message) {
				res.status(400).send({ message: error.message });
			}

			res.status(500).send({ message: 'Failed to create new user.' });
		}
	}
}

export default handler;
