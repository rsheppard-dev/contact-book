'use client';

import Link from 'next/link';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginButton() {
	const { data: session } = useSession();
	if (session) {
		return (
			<div className='flex gap-2'>
				<div>{session?.user?.name}</div>
				<div>|</div>
				<button onClick={() => signOut()}>Logout</button>
			</div>
		);
	}
	return (
		<div className='flex gap-2'>
			<Link href='/register'>Register</Link>
			<div>|</div>
			<button onClick={() => signIn()}>Login</button>
		</div>
	);
}