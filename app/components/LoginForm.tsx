'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import VerificationButton from './VerificationButton';

export default function LoginForm() {
	const id = useId();
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState('');

	if (errorMessage === 'data and hash arguments required') {
		setErrorMessage('User account is not linked to credentials.');
	}
	const {
		values,
		handleBlur,
		handleChange,
		handleSubmit,
		isSubmitting,
		touched,
		errors,
	} = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async values => {
			const res = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			if (res?.error) {
				setErrorMessage(res.error);
			} else {
				router.push('/account');
			}
		},
	});
	return (
		<>
			<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
				<div className='flex flex-col gap-2 col-span-2'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						id={id + '-email'}
						onChange={handleChange}
						value={values.email}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id={id + '-password'}
						onChange={handleChange}
						value={values.password}
					/>
				</div>
				<button
					type='submit'
					disabled={isSubmitting}
					className='w-fit bg-amber-300 hover:bg-amber-400 disabled:opacity-30 transition-colors px-3 py-2 rounded my-2'
				>
					Login
				</button>
			</form>

			{errorMessage ? (
				<div role='alert' className='mt-2 bg-red-100 px-4 py-2'>
					{errorMessage}
				</div>
			) : null}

			{errorMessage ===
			'You must verify your email address to activate your account.' ? (
				<VerificationButton email={values.email} />
			) : null}
		</>
	);
}
