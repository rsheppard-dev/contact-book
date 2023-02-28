import { Poppins } from '@next/font/google';

import LoginForm from '@/app/components/LoginForm';
import OAuthButtons from '@/app/components/OAuthButtons';

import { getProviders } from 'next-auth/react';

const inter = Poppins({ subsets: ['latin'], weight: ['400'] });

export default async function Login() {
	const providers = await getProviders();
	return (
		<main className='container'>
			<section className='prose'>
				<h1>Login</h1>
				<LoginForm />
				<hr />
				<OAuthButtons providers={providers} />
			</section>
		</main>
	);
}
