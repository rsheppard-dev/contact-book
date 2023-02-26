import { JwtPayload, verify } from 'jsonwebtoken';

function decodeAuthToken(token: string): JwtPayload | string | undefined {
	const secret = process.env.NEXTAUTH_SECRET!;

	return verify(token, secret);
}

export default decodeAuthToken;
