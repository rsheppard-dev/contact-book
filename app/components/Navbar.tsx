import Link from 'next/link';

import LoginButton from './LoginButton';

export default function Navbar() {
	return (
		<nav className='mb-14 flex w-screen bg-black py-2 text-gray-100 font-bold'>
			<div className='container flex justify-between items-center'>
				<Link href='/'>Contact Book</Link>
				<LoginButton />
			</div>
		</nav>
	);
}
