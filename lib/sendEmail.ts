import sgMail from '@sendgrid/mail';

function sendEmail(to: string, subject: string): void {
	const apiKey = process.env.SENDGRID_API_KEY!;
	const from = process.env.SENDGRID_SENDER!;

	sgMail.setApiKey(apiKey);
	const msg = {
		to,
		from,
		subject,
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch(error => {
			console.error(error);
		});
}

export default sendEmail;
