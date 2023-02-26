'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';
import axios from 'axios';

import userSchema from '@/schema/userSchema';

export default function RegistrationForm() {
	const id = useId();
	const router = useRouter();

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
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: userSchema,
		onSubmit: async values => {
			try {
				await axios.post('/api/user', {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					password: values.password,
				});

				// forward to verification page
				router.push('/account/verify/' + values.email);
			} catch (e) {
				console.log(e);
			}
		},
	});
	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
			<div className='flex flex-col gap-2'>
				<label htmlFor='firstName'>First Name:</label>
				<input
					type='text'
					name='firstName'
					id={id + '-firstName'}
					onChange={handleChange}
					value={values.firstName}
					onBlur={handleBlur}
				/>
				{errors.firstName && touched.firstName ? (
					<div className='bg-gray-800 px-3 py-2 text-gray-300' role='alert'>
						{errors.firstName}
					</div>
				) : null}
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor='lastName'>Last Name:</label>
				<input
					type='text'
					name='lastName'
					id={id + '-lastName'}
					onChange={handleChange}
					value={values.lastName}
					onBlur={handleBlur}
				/>
				{errors.lastName && touched.lastName ? (
					<div className='bg-gray-800 px-3 py-2 text-gray-300' role='alert'>
						{errors.lastName}
					</div>
				) : null}
			</div>
			<div className='flex flex-col gap-2 col-span-2'>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					name='email'
					id={id + '-email'}
					onChange={handleChange}
					value={values.email}
					onBlur={handleBlur}
				/>
				{errors.email && touched.email ? (
					<div className='bg-gray-800 px-3 py-2 text-gray-300' role='alert'>
						{errors.email}
					</div>
				) : null}
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					name='password'
					id={id + '-password'}
					onChange={handleChange}
					value={values.password}
					onBlur={handleBlur}
				/>
				{errors.password && touched.password ? (
					<div className='bg-gray-800 px-3 py-2 text-gray-300' role='alert'>
						{errors.password}
					</div>
				) : null}
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor='confirmPassword'>Confirm Password:</label>
				<input
					type='password'
					name='confirmPassword'
					id={id + '-confirmPassword'}
					onChange={handleChange}
					value={values.confirmPassword}
					onBlur={handleBlur}
				/>
				{errors.confirmPassword && touched.confirmPassword ? (
					<div className='bg-gray-800 px-3 py-2 text-gray-300' role='alert'>
						{errors.confirmPassword}
					</div>
				) : null}
			</div>
			<button
				type='submit'
				disabled={isSubmitting}
				className='w-fit bg-amber-300 hover:bg-amber-400 disabled:opacity-30 transition-colors px-3 py-2 rounded my-2'
			>
				Register
			</button>
		</form>
	);
}
