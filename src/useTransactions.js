import { useContext } from 'react'
import { ExpenseTrackerContext } from './Context/Context'
import { incomeCategories, expenseCategories, resetCategories} from './Constant/categories'

const useTransactions = ({title}) =>{
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);
    const transactionPerType = transactions.filter((t) => t.type === title);
    console.log(transactions);
    const total = transactionPerType.reduce((acc,currVal) => acc += currVal.amount,0);
    const categories = (title === "Income") ? incomeCategories : expenseCategories;

    transactionPerType.map((t) =>{
        const category = categories.find((c) => c.type === t.category);
        if(category) category.amount += t.amount
    });

    const filterCategories = categories.filter((c) => c.amount > 0);

    const chartData ={
        datasets:[{
            data: filterCategories.map((c) => c.amount),
            backgroundColor: filterCategories.map((c) => c.color),
        }],
        labels: filterCategories.map((c) => c.type),
    }
    console.log({total,chartData})
    return { total, chartData}
    
}
export default useTransactions