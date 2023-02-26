'use client';

import { useId } from 'react';
import { useSearchParams } from 'next/navigation';

import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
	const id = useId();
	const searchParams = useSearchParams();

	const email = searchParams.get('email') as string | undefined;

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
			console.log(res);
		},
	});
	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
			<div className='flex flex-col gap-2 col-span-2'>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					name='email'
					id={id + '-email'}
					onChange={handleChange}
					value={values.email}
					defaultValue={email}
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
	);
}
