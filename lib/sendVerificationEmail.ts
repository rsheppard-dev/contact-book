import generateAuthToken from './generateAuthToken';
import client from '@/prisma/client';

async function sendVerificationEmail(email: string): Promise<void> {
	// get user details from database (if unverified)
	const user = await client.user.findFirst({
		where: {
			email,
			emailVerified: null,
		},
	});

	// check if user was found
	if (!user) throw new Error('Unable to find unverified user with that email.');

	// create jwt with user data
	const token = generateAuthToken(user);

	// verification link
	const url = `${process.env.NEXTAUTH_URL}/api/user/verify?token=${token}`;

	// send verification email to user
	// sendEmail(user.email!, 'Please Verify Your Account');
	console.log('email sent');
	console.log(url);
}

export default sendVerificationEmail;
