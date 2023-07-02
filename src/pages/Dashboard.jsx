import { useLoaderData } from 'react-router-dom';

import { createBudget, createExpense, fetchData } from '../helpers';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import { toast } from 'react-toastify';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

export function dashboardLoader() {
	const userName = fetchData('userName');
	const budgets = fetchData('budgets');
	const expenses = fetchData('expenses');
	return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
	const data = await request.formData();
	const { _action, ...values } = Object.fromEntries(data);
	//new user submission
	if (_action === 'newUser') {
		try {
			localStorage.setItem('userName', JSON.stringify(values.userName));
			return toast.success(`Welcome, ${values.userName}`);
		} catch (e) {
			throw new Error('There was a problem creating your account.');
		}
	}
	//create budget
	if (_action === 'createBudget') {
		try {
			createBudget({
				name: values.newBudget,
				amount: values.newBudgetAmount,
			});
			return toast.success(`Budget ${values.newBudget} created`);
		} catch (e) {
			throw new Error('There was a problem creating your budget.');
		}
	}
	if (_action === 'createExpense') {
		try {
			createExpense({
				name: values.newExpense,
				amount: values.newExpenseAmount,
				budgetId: values.newExpenseBudget,
			});
			return toast.success(`Expense ${values.newExpense} created`);
		} catch (e) {
			throw new Error('There was a problem creating your expnse.');
		}
	}
}

const Dashboard = () => {
	const { userName, budgets, expenses } = useLoaderData();

	return (
		<>
			{userName ? (
				<div className='dashboard'>
					<h1>
						Welcome back, <span className='accent'>{userName}</span>
					</h1>
					<div className='grid-sm'>
						{budgets && budgets.length > 0 ? (
							<div className='grid-lg'>
								<div className='flex-lg'>
									<AddBudgetForm />
									<AddExpenseForm budgets={budgets} />
								</div>
								<h2>Existing Budgets</h2>
								<div className='budgets'>
									{budgets.map((b) => (
										<BudgetItem
											key={b.id}
											budget={b}
										/>
									))}
								</div>
								{expenses && expenses.length > 0 ? (
									<div className='grid-md'>
										<h2>Recent Expenses</h2>
										<Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
									</div>
								) : (
									<div></div>
								)}
							</div>
						) : (
							<div className='grid-sm'>
								<p>Personal budgeting is the secret to financial freedom.</p>
								<p>Create a budget to get started!</p>
								<AddBudgetForm />
							</div>
						)}
					</div>
				</div>
			) : (
				<Intro />
			)}
		</>
	);
};

export default Dashboard;