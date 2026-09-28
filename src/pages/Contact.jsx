import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { IoCheckmark, IoClose } from 'react-icons/io5';

import Heading from '../components/Heading';
import sendMail from '../utils/mailer';

const contactLinks = [
	{
		label: 'EMAIL',
		value: 'karthees.in@gmail.com',
		href: 'mailto:karthees.in@gmail.com',
		icon: SiGmail,
	},
	{
		label: 'LINKEDIN',
		value: 'linkedin.com/in/mrkarthees',
		href: 'https://linkedin.com/in/mrkarthees',
		icon: FaLinkedin,
	},
	{
		label: 'GITHUB',
		value: 'github.com/mrkarthees',
		href: 'https://github.com/mrkarthees',
		icon: FaGithub,
	},
];

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	});

	const [loading, setLoading] = useState(false);

	const [status, setStatus] = useState({
		type: '',
		message: '',
	});

	const [showSuccessPopup, setShowSuccessPopup] = useState(false);

	const closeTimerRef = useRef(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const showStatus = (type, message) => {
		setStatus({
			type,
			message,
		});

		setTimeout(() => {
			setStatus({
				type: '',
				message: '',
			});
		}, 3000);
	};

	const openSuccessPopup = () => {
		setShowSuccessPopup(true);

		// clear any previous timer before starting a new one
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
		}

		closeTimerRef.current = setTimeout(() => {
			setShowSuccessPopup(false);
		}, 3000);
	};

	const closeSuccessPopup = () => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
		}

		setShowSuccessPopup(false);
	};

	// cleanup timer on unmount
	useEffect(() => {
		return () => {
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
			}
		};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { name, email, phone, subject, message } = formData;

		if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
			showStatus('error', 'Please fill all required fields.');
			return;
		}

		setLoading(true);
		setStatus({
			type: '',
			message: '',
		});

		try {
			const { success, error } = await sendMail({
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim(),
				subject: subject.trim(),
				message: message.trim(),
			});

			if (success) {
				console.log('Contact form submitted successfully:', {
					name: name.trim(),
					email: email.trim(),
					phone: phone.trim(),
					subject: subject.trim(),
					message: message.trim(),
				});

				openSuccessPopup();

				setFormData({
					name: '',
					email: '',
					phone: '',
					subject: '',
					message: '',
				});
			} else {
				console.error('EmailJS Error:', error);

				showStatus('error', 'Something went wrong. Please try again.');
			}
		} catch (error) {
			console.error('Contact form error:', error);

			showStatus('error', 'Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id='contact' className='scroll-section container-page'>
			<Heading label='contact' title="Let's work together." />

			<div className='mt-12 grid grid-cols-1 gap-10 sm:mt-16 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16'>
				{/* Contact Information */}
				<div className='flex flex-col gap-7 lg:pt-14'>
					{contactLinks.map((contact) => {
						const Icon = contact.icon;

						return (
							<div key={contact.label}>
								<div className='flex items-center gap-2'>
									<Icon className='text-accent' size={16} />

									<span className='font-sans text-xs tracking-wide text-secondary-text'>
										{contact.label}
									</span>
								</div>

								<a
									href={contact.href}
									target={contact.label === 'EMAIL' ? undefined : '_blank'}
									rel={contact.label === 'EMAIL' ? undefined : 'noopener noreferrer'}
									className='mt-1 block w-fit text-xs underline decoration-border underline-offset-4 transition hover:text-accent'
								>
									{contact.value}
								</a>
							</div>
						);
					})}
				</div>

				{/* Contact Form */}
				<form
					onSubmit={handleSubmit}
					className='w-full rounded-md border border-accent/30 p-4 sm:p-5 lg:p-6'
				>
					<div className='grid grid-cols-1 gap-5'>
						{/* Name */}
						<div>
							<label htmlFor='name' className='mb-2 block text-sm font-semibold'>
								Name
							</label>

							<input
								id='name'
								name='name'
								type='text'
								value={formData.name}
								onChange={handleChange}
								placeholder='Enter name'
								required
								disabled={loading}
								className='h-[46px] w-full rounded-md border border-border bg-transparent px-3 text-sm outline-none transition placeholder:text-secondary-text focus:border-accent disabled:cursor-not-allowed disabled:opacity-60'
							/>
						</div>

						{/* Email */}
						<div>
							<label htmlFor='email' className='mb-2 block text-sm font-semibold'>
								Email
							</label>

							<input
								id='email'
								name='email'
								type='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='Enter email'
								required
								disabled={loading}
								className='h-[46px] w-full rounded-md border border-border bg-transparent px-3 text-sm outline-none transition placeholder:text-secondary-text focus:border-accent disabled:cursor-not-allowed disabled:opacity-60'
							/>
						</div>

						{/* Phone */}
						<div>
							<label htmlFor='phone' className='mb-2 block text-sm font-semibold'>
								Phone
							</label>

							<input
								id='phone'
								name='phone'
								type='tel'
								value={formData.phone}
								onChange={handleChange}
								placeholder='Enter phone number'
								disabled={loading}
								className='h-[46px] w-full rounded-md border border-border bg-transparent px-3 text-sm outline-none transition placeholder:text-secondary-text focus:border-accent disabled:cursor-not-allowed disabled:opacity-60'
							/>
						</div>

						{/* Subject */}
						<div>
							<label htmlFor='subject' className='mb-2 block text-sm font-semibold'>
								Subject
							</label>

							<input
								id='subject'
								name='subject'
								type='text'
								value={formData.subject}
								onChange={handleChange}
								placeholder='Enter your need'
								required
								disabled={loading}
								className='h-[46px] w-full rounded-md border border-border bg-transparent px-3 text-sm outline-none transition placeholder:text-secondary-text focus:border-accent disabled:cursor-not-allowed disabled:opacity-60'
							/>
						</div>

						{/* Message */}
						<div>
							<label htmlFor='message' className='mb-2 block text-sm font-semibold'>
								Message
							</label>

							<textarea
								id='message'
								name='message'
								rows='3'
								value={formData.message}
								onChange={handleChange}
								placeholder='Enter your message'
								required
								disabled={loading}
								className='w-full resize-none rounded-md border border-border bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-secondary-text focus:border-accent disabled:cursor-not-allowed disabled:opacity-60'
							/>
						</div>

						{/* Submit */}
						<div className='flex justify-center'>
							<button
								type='submit'
								disabled={loading}
								className='rounded-full bg-accent px-4 py-2 text-sm font-sans text-white transition-all duration-300 hover:translate-x-1 hover:font-semibold disabled:cursor-not-allowed disabled:opacity-60'
							>
								{loading ? 'Sending...' : 'Submit'}
							</button>
						</div>
					</div>
				</form>
			</div>

			{/* Error Toast (success now uses the full-screen popup below) */}
			{status.message && (
				<div
					role='status'
					className='fixed right-5 bottom-5 z-[200] max-w-[calc(100vw-40px)] rounded-lg border border-red-500 bg-background px-5 py-3 text-sm text-red-500 shadow-lg'
				>
					{status.message}
				</div>
			)}

			{/* Full-screen Success Popup */}
			{showSuccessPopup && (
				<div
					role='dialog'
					aria-modal='true'
					aria-label='Message sent successfully'
					onClick={closeSuccessPopup}
					className='fixed inset-0 z-[300] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center'
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className='relative m-5 w-full max-w-sm animate-[fadeIn_0.25s_ease-out] rounded-2xl bg-background p-8 text-center shadow-2xl'
					>
						{/* Close button */}
						<button
							type='button'
							onClick={closeSuccessPopup}
							aria-label='Close'
							className='absolute top-3 right-3 rounded-full p-1.5 text-secondary-text transition hover:bg-border/40 hover:text-accent'
						>
							<IoClose size={20} />
						</button>

						{/* Green check icon */}
						<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500'>
							<IoCheckmark size={36} className='text-white' />
						</div>

						<h3 className='mt-5 text-lg font-semibold'>Message Sent!</h3>

						<p className='mt-2 text-sm text-secondary-text'>
							Thanks for reaching out. I&apos;ll get back to you soon.
						</p>

						{/* Auto-close progress bar */}
						<div className='mt-6 h-1 w-full overflow-hidden rounded-full bg-border/40'>
							<div className='h-full w-full origin-left animate-[shrink_3s_linear_forwards] bg-green-500' />
						</div>
					</div>
				</div>
			)}

			{/* Keyframes for the popup entrance + progress bar (Tailwind arbitrary animations) */}
			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; transform: translateY(12px) scale(0.97); }
					to { opacity: 1; transform: translateY(0) scale(1); }
				}
				@keyframes shrink {
					from { transform: scaleX(1); }
					to { transform: scaleX(0); }
				}
			`}</style>
		</section>
	);
};

export default Contact;
