const generateRandomColor = () => {
	const existingBudgetLength = fetchData('budgets')?.length ?? 0;
	return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
	return localStorage.removeItem(key);
};

export const createBudget = ({ name, amount }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: Number(amount),
		color: generateRandomColor(),
	};
	const existingBudgets = fetchData('budgets') ?? [];
	return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]));
};

export const createExpense = ({ name, amount, budgetId }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: Number(amount),
		budgetId: budgetId,
	};
	const existingExpenses = fetchData('expenses') ?? [];
	return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]));
};

export const formatCurrency = (amount) => {
	return amount.toLocaleString(undefined, {
		style: 'currency',
		currency: 'USD',
	});
};

export const formatPercentage = (amount) => {
	return amount.toLocaleString(undefined, {
		style: 'percent',
		minimumFractionDigits: 0,
	});
};

export const formatDateToLocaleString = (epoch) => {
	return new Date(epoch).toLocaleDateString();
};

export const calculateSpendByBudget = (budgetId) => {
	const expenses = fetchData('expenses') ?? [];
	const budgetSpent = expenses.reduce((acc, expense) => {
		if (expense.budgetId !== budgetId) return acc;
		return (acc += expense.amount);
	}, 0);
	return budgetSpent;
};
