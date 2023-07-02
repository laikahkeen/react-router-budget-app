import { UserPlusIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Form, useFetcher } from 'react-router-dom';
import illustration from '../assets/illustration.jpg';

const Intro = () => {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === 'submitting';

	return (
		<div className='intro'>
			<div>
				<h1>
					Take Control of <span className='accent'>Your Money</span>
				</h1>
				<p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
				<Form method='post'>
					<input
						type='hidden'
						name='_action'
						value='newUser'
					/>
					<input
						type='text'
						name='userName'
						required
						placeholder='What is your name?'
						aria-label='Your Name'
						autoComplete='given-name'
					/>
					<button
						type='submit'
						className='btn btn--dark'
						disabled={isSubmitting}>
						{isSubmitting ? (
							<span>Creating</span>
						) : (
							<>
								<span>Create Account</span>
								<UserPlusIcon width={20} />
							</>
						)}
					</button>
				</Form>
			</div>
			<img
				src={illustration}
				alt='Person with money'
				width={600}
			/>
		</div>
	);
};

export default Intro;
