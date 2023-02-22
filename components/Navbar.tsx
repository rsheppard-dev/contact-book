import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className='mb-14 flex w-screen bg-black py-2 text-gray-100 font-bold'>
			<div className='container flex justify-between items-center'>
				<Link href='/register'>Register</Link>
				<Link href='/login'>Login</Link>
			</div>
		</nav>
	);
}
