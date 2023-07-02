import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';

const AddExpenseForm = ({ budgets }) => {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === 'submitting';

	const formRef = useRef();
	const focusRef = useRef();

	useEffect(() => {
		if (!isSubmitting) {
			formRef.current.reset();
			focusRef.current.focus();
		}
	}, [isSubmitting]);

	return (
		<div className='form-wrapper'>
			<h2 className='h3'>
				Add New <span className='accent'>{budgets.length === 1 && `${budgets.map((b) => b.name)}`}</span> Expense
			</h2>
			<fetcher.Form
				method='post'
				className='grid-sm'
				ref={formRef}>
				<input
					type='hidden'
					name='_action'
					value='createExpense'
				/>
				<div className='expense-inputs'>
					<div className='grid-xs'>
						<label htmlFor='newExpense'>Expense Name</label>
						<input
							type='text'
							name='newExpense'
							id='newExpense'
							placeholder='e.g. Banana'
							ref={focusRef}
							required
						/>
					</div>
					<div className='grid-xs'>
						<label htmlFor='newExpenseAmount'>Expense Amount</label>
						<input
							type='number'
							inputMode='decimal'
							step={0.01}
							name='newExpenseAmount'
							id='newExpenseAmount'
							placeholder='e.g. $3.50'
							required
						/>
					</div>
					<div
						className='grid-xs'
						hidden={budgets.length === 1}>
						<label htmlFor='newExpenseBudget'>Budget Category</label>
						<select
							name='newExpenseBudget'
							id='newExpenseBudget'
							required>
							{budgets
								.sort((a, b) => a.createdAt - b.createdAt)
								.map((budget) => (
									<option
										value={budget.id}
										key={budget.id}>
										{budget.name}
									</option>
								))}
						</select>
					</div>
					<button
						type='submit'
						className='btn btn--dark'
						disabled={isSubmitting}>
						{isSubmitting ? (
							<span>Submitting</span>
						) : (
							<>
								<span>Add Expense</span>
								<PlusCircleIcon width={20} />
							</>
						)}
					</button>
				</div>
			</fetcher.Form>
		</div>
	);
};

export default AddExpenseForm;
