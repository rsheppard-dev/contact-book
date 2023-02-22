import { Poppins } from '@next/font/google';

import RegistrationForm from '@/components/RegistrationForm';

const inter = Poppins({ subsets: ['latin'], weight: ['400'] });

export default async function Home() {
	return (
		<main className='container'>
			<section className='prose'>
				<h1>Register</h1>
				<RegistrationForm />
			</section>
		</main>
	);
}
