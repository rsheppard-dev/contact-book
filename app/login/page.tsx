import { Poppins } from '@next/font/google';

import LoginForm from '@/components/LoginForm';

const inter = Poppins({ subsets: ['latin'], weight: ['400'] });

export default async function Login() {
	return (
		<main className='container'>
			<section className='prose'>
				<h1>Login</h1>
				<LoginForm />
			</section>
		</main>
	);
}
