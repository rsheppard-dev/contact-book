import Image from 'next/image';
import { Poppins } from '@next/font/google';

async function getUsers() {
	const res = await fetch(`${process.env.BASE_URL}/api/user`);

	if (!res.ok) {
		console.log(res);
	}

	return res.json();
}

const inter = Poppins({ subsets: ['latin'], weight: ['400'] });

export default async function Home() {
	const data = await getUsers();
	return <main></main>;
}
