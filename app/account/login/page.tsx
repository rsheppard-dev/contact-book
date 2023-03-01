import LoginForm from '@/app/components/LoginForm';
import OAuthButtons from '@/app/components/OAuthButtons';

export default function Login() {
	return (
		<main className='container'>
			<section className='prose'>
				<h1>Login</h1>
				<LoginForm />
				<hr />
				<OAuthButtons />
			</section>
		</main>
	);
}
