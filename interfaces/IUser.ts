interface IUser {
	id: string;
	created: Date;
	updatedAt: Date;
	name: string;
	email: string;
	emailVerified: Date | null;
	password: string;
	image?: string;
}

export default IUser;
