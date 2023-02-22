import * as yup from 'yup';

const userSchema = yup.object({
	firstName: yup
		.string()
		.min(2, 'First name must be at least 2 characters long.')
		.max(50, 'First name must not exceed 50 characters.')
		.required('First name is required.'),
	lastName: yup
		.string()
		.min(2, 'Last name must be at least 2 characters long.')
		.max(50, 'Last name must not exceed 50 characters.')
		.required('Last name is required.'),
	email: yup
		.string()
		.email('You must enter a valid email!')
		.required('Email is required.'),
	password: yup
		.string()
		.required('Password is required.')
		.min(8, 'Password must be at least 8 characters long.')
		.test({
			test(value, ctx) {
				if (!/[A-Z]/.test(value)) {
					return ctx.createError({
						message: 'Password must contain at least one uppercase letter.',
					});
				}
				if (!/[a-z]/.test(value)) {
					return ctx.createError({
						message: 'Password must contain at least one lowercase letter.',
					});
				}
				if (!/[0-9]/.test(value)) {
					return ctx.createError({
						message: 'Password must contain at least one number.',
					});
				}
				return true;
			},
		}),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), ''], 'Passwords do not match.'),
});

export default userSchema;
