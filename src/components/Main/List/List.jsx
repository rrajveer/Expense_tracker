import React,{ useContext } from 'react'
import  useStyles  from './styles'
import { ExpenseTrackerContext } from '../../../Context/Context'
import { List as MUIList, ListItem,  ListItemText , ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Slide} from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'

const List = () => {
    const classes = useStyles()
    const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);

    // console.log(globalState);

    // const transactions = [
    //     {id:1, type:"Income", category:"Salary", amount:50, date:new Date()},
    //     {id:2, type:"Expense", category:"Pets", amount:100, date:new Date()},
    //     {id:3, type:"Income", category:"Buisness", amount:50, date:new Date()}
    // ];
    return (
        <MUIList dense={false} className={classes.list}>
            {transactions.map((transaction) =>(
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
                        <ListItemSecondaryAction aria-label="delete" onClick={() => deleteTransaction(transaction.id)} >
                            <Delete/>
                        </ListItemSecondaryAction>

                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default List
