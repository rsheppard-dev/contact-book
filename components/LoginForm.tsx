'use client';

import { useId } from 'react';

import { useFormik } from 'formik';
import axios from 'axios';

export default function LoginForm() {
	const id = useId();

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
			try {
				await axios.post('/api/user/login', {
					email: values.email,
					password: values.password,
				});
			} catch (e) {
				console.log(e);
			}
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
