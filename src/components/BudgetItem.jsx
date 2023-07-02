import React from 'react';
import { calculateSpendByBudget, formatCurrency, formatPercentage } from '../helpers';

const BudgetItem = ({ budget }) => {
	const { id, name, amount, color } = budget;
	const spent = calculateSpendByBudget(id);
	return (
		<div
			className='budget'
			style={{ '--accent': color }}>
			<div className='progress-text'>
				<h3>{name}</h3>
				<p>{formatCurrency(amount)} Budgeted</p>
			</div>
			<progress
				max={amount}
				value={spent}>
				{formatPercentage(spent / amount)}
			</progress>
			<div className='progress-text'>
				<small>{formatCurrency(spent)}</small>
				<small>{formatCurrency(amount - spent)}</small>
			</div>
		</div>
	);
};

export default BudgetItem;
