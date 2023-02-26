'use client';

import axios, { AxiosError } from 'axios';

export default function VerificationButton({ email }: { email: string }) {
	async function handleClick() {
		try {
			await axios.get('/api/email/verify', {
				params: { email },
			});
		} catch (err) {
			const error = err as AxiosError;

			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		}
	}

	if (email) {
		return (
			<div>
				<p>
					If you do not receive an email you can request another email below.
				</p>

				<button
					type='button'
					onClick={handleClick}
					className='w-fit bg-amber-300 hover:bg-amber-400 disabled:opacity-30 transition-colors px-3 py-2 rounded my-2'
				>
					Resend verifaction email
				</button>
			</div>
		);
	} else {
		return <div></div>;
	}
}
