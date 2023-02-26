import { Poppins } from '@next/font/google';
import client from '@/prisma/client';

import VerificationButton from '@/app/components/VerificationButton';

const inter = Poppins({ subsets: ['latin'], weight: ['400'] });

export default async function VerifyEmail({
	params,
}: {
	params: { email: string };
}) {
	let error = '';
	const email = decodeURIComponent(params.email);

	const user = await client.user.findUnique({
		where: { email },
		select: { email: true, emailVerified: true },
	});

	const verified = user?.emailVerified ? true : false;

	if (!user) error = `No registered account found with the email, ${email}.`;
	if (verified)
		error = 'Your email has already been verified for this account.';

	if (!error) {
		return (
			<section className='container'>
				<h1>
					Please check your email. A verification link has been sent to {email}.
					You will need to open the link to activate your accont.
				</h1>

				<VerificationButton email={email} />
			</section>
		);
	}
	return (
		<section className='container'>
			<h1>{error}</h1>
		</section>
	);
}
