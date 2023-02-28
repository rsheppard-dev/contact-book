import { Poppins } from '@next/font/google';
import client from '@/prisma/client';

import VerificationButton from '@/app/components/VerificationButton';

const inter = Poppins({ subsets: ['latin'], weight: ['400'] });

export default async function VerifyEmail({
	params,
}: {
	params: { id: string };
}) {
	let error = '';
	const id = decodeURIComponent(params.id);

	const user = await client.user.findUnique({
		where: { id },
		select: { id: true, email: true, emailVerified: true },
	});

	const verified = user?.emailVerified ? true : false;

	// check for errors
	if (!user) error = 'Unable to find a user with those details.';
	if (verified) error = 'Your email has already been verified on this account.';

	if (!error) {
		return (
			<section className='container'>
				<h1>
					Please check your email. A verification link has been sent to{' '}
					{user?.email}. You will need to open the link to activate your accont.
				</h1>

				<VerificationButton email={user?.email!} />
			</section>
		);
	}

	// display error message if something went wrong
	return (
		<section className='container'>
			<h1>{error}</h1>
		</section>
	);
}
