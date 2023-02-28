import { JwtPayload, sign } from 'jsonwebtoken';

function generateAuthToken(
	payload: JwtPayload,
	expiresIn: string = '1d'
): string {
	const secret = process.env.NEXTAUTH_SECRET!;

	return sign(payload, secret, { expiresIn });
}

export default generateAuthToken;
