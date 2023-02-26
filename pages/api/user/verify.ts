import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/prisma/client';
import decodeAuthToken from '@/lib/decodeAuthToken';
import IUser from '@/interfaces/IUser';
import { ApiError } from 'next/dist/server/api-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// get: /api/user/verify/:token
	if (req.method === 'GET') {
		// capture token from user request
		const token = req.query.token as string;

		try {
			if (!token) throw new Error('No token received.');

			// get user account details from jwt token payload
			const { id } = decodeAuthToken(token) as IUser;

			// find matching user in database
			const user = await client.user.findUnique({ where: { id } });

			// check if email was previously verified
			if (user?.emailVerified)
				throw new Error('Email has already been verified.');

			// throw error if no user found
			if (!user) throw new Error('Failed to match user account details.');

			// validate user email
			await client.user.update({
				where: { id },
				data: { emailVerified: new Date() },
			});

			// forward user to login page
			res.redirect(`/account/login?email=${user.email}`).end();
		} catch (error: any) {
			if (error.message) {
				res.status(400).send({ message: error.message });
			}

			res.status(500).send({ message: 'Failed to verify user email.' });
		}
	}
}

export default handler;
