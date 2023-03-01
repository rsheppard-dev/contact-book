import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import userSchema from '@/schema/userSchema';
import client from '@/prisma/client';
import sendVerificationEmail from '@/lib/sendVerificationEmail';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import { hash } from 'bcrypt';
import IUser from '@/interfaces/IUser';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// get user profile
	// get: /api/user
	if (req.method === 'GET') {
		const session = await getServerSession(req, res, authOptions);

		if (!session?.user?.email) {
			res.status(401).json({ message: 'You must be logged in.' });
			return;
		}

		const user = await client.user.findUnique({
			where: { email: session.user.email },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
			},
		});

		res.status(200).send(user);
	}

	// create new user
	// post: /api/user
	if (req.method === 'POST') {
		// get data from user
		const data = req.body;

		try {
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
			data.password = await hash(data.password, 12);

			// add new user to database
			const user = await client.user.create({
				data: {
					name: `${data.firstName} ${data.lastName}`,
					email: data.email,
					password: data.password,
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

	// delete user account
	// delete: /api/user
	if (req.method === 'DELETE') {
		const session = await getServerSession(req, res, authOptions);

		if (!session?.user?.email) {
			res.status(401).json({ message: 'You must be logged in.' });
			return;
		}

		const user = await client.user.delete({
			where: { email: session.user.email },
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		res.status(200).send(user);
	}

	// update user details
	// patch: /api/user
	if (req.method === 'PATCH') {
		const session = await getServerSession(req, res, authOptions);

		if (!session?.user?.email) {
			res.status(401).json({ message: 'You must be logged in.' });
			return;
		}

		const data = req.body as IUser;

		// validate user data
		await userSchema.validate(data);

		// hash password if changed
		if (data.password) {
			data.password = await hash(data.password, 12);
		}

		const user = await client.user.update({
			where: { email: session.user.email },
			data,
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		res.status(200).send(user);
	}

	res.status(500).send({ message: 'Invalid request method.' });
}

export default handler;
