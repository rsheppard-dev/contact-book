import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import sendVerificationEmail from '@/lib/sendVerificationEmail';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// get: /api/email/verify/:email
	if (req.method === 'GET') {
		const email = req.query.email as string;

		try {
			// check if email was received
			if (!email) throw new Error('No email received.');

			// send verification email
			await sendVerificationEmail(email);

			// forward user to login page
			res.redirect('/account/login');
		} catch (err) {
			const error = err as ApiError;

			if (error.message) {
				res.status(400).send({ message: error.message });
			}

			res.status(500).send({ message: 'Failed to send verification email.' });
		}
	}
}

export default handler;
