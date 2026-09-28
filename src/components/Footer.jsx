import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { FaGithub, FaLinkedin, FaDribbble } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const socialLinks = [
	{
		name: 'Email',
		href: 'mailto:karthees.in@gmail.com',
		icon: SiGmail,
	},
	{
		name: 'Dribbble',
		href: 'https://dribbble.com/mrkarthees',
		icon: FaDribbble,
	},
	{
		name: 'LinkedIn',
		href: 'https://linkedin.com/in/mrkarthees',
		icon: FaLinkedin,
	},
	{
		name: 'GitHub',
		href: 'https://github.com/mrkarthees',
		icon: FaGithub,
	},
];

const Footer = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');

		const darkMode =
			savedTheme === 'dark' ||
			(!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

		setIsDark(darkMode);
		document.documentElement.classList.toggle('dark', darkMode);
	}, []);

	const toggleTheme = (dark) => {
		setIsDark(dark);

		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	};

	return (
		<footer className='container-page mt-10 border-t border-border px-4 py-8 sm:px-6 sm:py-10 lg:px-8'>
			<div className='flex flex-col items-center'>
				{/* Title */}
				<p className='font-sans text-sm font-semibold'>Let's Connect</p>

				{/* Social Icons */}
				<div className='mt-4 flex items-center gap-15'>
					{socialLinks.map(({ name, href, icon: Icon }) => (
						<a
							key={name}
							href={href}
							target={name === 'Email' ? undefined : '_blank'}
							rel={name === 'Email' ? undefined : 'noopener noreferrer'}
							aria-label={name}
							className='text-primary-text transition-all duration-300 hover:scale-110 hover:text-accent'
						>
							<Icon size={17} />
						</a>
					))}
				</div>

				{/* Theme Toggle */}
				<div className='mt-6 flex h-12 items-center rounded-full border border-border bg-background p-1'>
					{/* Light */}
					<button
						type='button'
						onClick={() => toggleTheme(false)}
						aria-label='Switch to light mode'
						aria-pressed={!isDark}
						className={`
							flex h-10 w-12 items-center justify-center rounded-full
							transition-all duration-300
							${
								!isDark
									? 'bg-accent/10 text-accent'
									: 'text-secondary-text hover:text-primary-text'
							}
						`}
					>
						<Sun size={20} />
					</button>

					{/* Dark */}
					<button
						type='button'
						onClick={() => toggleTheme(true)}
						aria-label='Switch to dark mode'
						aria-pressed={isDark}
						className={`
							flex h-10 w-12 items-center justify-center rounded-full
							transition-all duration-300
							${
								isDark
									? 'bg-accent/10 text-white'
									: 'text-secondary-text hover:text-primary-text'
							}
						`}
					>
						<Moon size={20} />
					</button>
				</div>

				{/* Copyright */}
				<p className='mt-5 text-center font-sans text-[10px] text-secondary-text sm:text-xs'>
					© {new Date().getFullYear()} - Kartheeswaran
				</p>
			</div>
		</footer>
	);
};

export default Footer;
