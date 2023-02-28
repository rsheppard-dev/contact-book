'use client';
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

import { signIn } from 'next-auth/react';

export default function OAuthButtons({
	providers,
}: {
	providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null;
}) {
	return (
		<div>
			{providers?.google && (
				<button
					type='button'
					onClick={() => signIn(providers.google.id)}
					className='border-2 border-gray-400 px-3 py-2 shadow'
				>
					Login with Google
				</button>
			)}
		</div>
	);
}
