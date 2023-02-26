import { JwtPayload, sign } from 'jsonwebtoken';

function generateAuthToken(payload: JwtPayload): string {
	const secret = process.env.NEXTAUTH_SECRET!;

	return sign(payload, secret, { expiresIn: '1d' });
}

export default generateAuthToken;
