'use client';
import { signIn } from 'next-auth/react';

export default function OAuthButtons() {
	return (
		<div>
			<button
				type='button'
				onClick={() => signIn('google', { callbackUrl: '/account' })}
				className='border-2 border-gray-400 px-3 py-2 shadow'
			>
				Login with Google
			</button>
		</div>
	);
}
