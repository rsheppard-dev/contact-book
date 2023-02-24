import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import client from '@/prisma/client';
import { compare } from 'bcrypt';

export default NextAuth({
	adapter: PrismaAdapter(client),
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials) throw new Error();
				// Add logic here to look up the user from the credentials supplied
				const user = await client.user.findUniqueOrThrow({
					where: {
						email: credentials?.email,
					},
				});

				if (user) {
					if (user.password === null) throw new Error('No password set!');

					// check password
					const match = await compare(credentials.password, user.password!);

					if (!match) throw new Error('Email or password are incorrect.');

					// Any object returned will be saved in `user` property of the JWT
					return user;
				}

				// If you return null then an error will be displayed advising the user to check their details.
				throw new Error('Invalid credentials.');
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	pages: {
		signIn: '/login',
	},
});
