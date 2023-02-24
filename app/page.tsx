import Image from 'next/image';
import { Poppins } from '@next/font/google';

const inter = Poppins({ subsets: ['latin'], weight: ['400'] });

export default async function Home() {
	return (
		<section className='container'>
			<h1>Home Page</h1>
		</section>
	);
}
