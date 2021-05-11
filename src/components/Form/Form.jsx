import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button , TextField, InputLabel,FormControl, Select, MenuItem, Typography, Grow} from '@material-ui/core'
import  useStyles  from './styles'
import { ExpenseTrackerContext } from '../../Context/Context'
import { v4 as uuidv4 } from 'uuid'
import { incomeCategories, expenseCategories} from '../../Constant/categories'
import { FormatDate } from '../../utils/FormatDate'
import { useSpeechContext } from '@speechly/react-client'
import CustomizedSnackBar from '../SnackBar/SnackBar'

const initialState = {
    type:'Income',
    amount:'',
    category:'',
    date: FormatDate(new Date()),
}

const Form = () => {
    const classes = useStyles()
    const{ segment } = useSpeechContext()
    const[formData, setFormData ] = useState(initialState)
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const[open, setOpen] = useState(false);
    // console.log(formData);

    const createTransaction = () =>{
        if(Number.isNaN(Number(formData.amount)) || formData.amount <=0 || !formData.date.includes("-")) return
        const transaction={ ...formData, amount: Number(formData.amount), id: uuidv4()}
        
        addTransaction(transaction);
        setFormData(initialState)
        setOpen(true)
    }

    useEffect(() =>{
        if(segment){
            if(segment.intent.intent === "add_income"){
                setFormData({ ...formData, type: "Income"})
            }else if(segment.intent.intent === "add_expense"){
                setFormData({ ...formData, type: "Expense"})
            }else if(segment.isFinal && segment.intent.intent === "create_transaction"){
                return createTransaction()
            }else if(segment.isFinal && segment.intent.intent === "cancel_transaction"){
                return setFormData(initialState)
            }
            segment.entities.forEach((e) =>{
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount': setFormData({ ...formData, amount:e.value})
                                    break;
                    case 'date': setFormData({ ...formData, date:e.value})
                                    break;
                    case 'category': 
                        if(incomeCategories.map((ic) => ic.type).includes(category)){
                            setFormData({ ...formData, type:"Income",category:category})
                        }else if(expenseCategories.map((ic) => ic.type).includes(category)){
                            setFormData({ ...formData, type:"Expense",category:category})
                        }
                                    break;
                    default:
                        break;
                }
            });
            if(segment.isFinal && formData.amount && formData.type && formData.date && formData.category){
                createTransaction();
            }
         }
        },[segment])

        
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories 
    
    return (
       <Grid container spacing={2}>
           <CustomizedSnackBar open={open} setOpen={setOpen}/>
           <Grid item xs={12}>
               <Typography align="center" variant="subtitle2" gutterbottom>
                  { (segment) ? (
                      <>
                      {segment.words.map((w) => w.value).join(" ")}
                      </>
                  ) : null }
               </Typography>
            
           </Grid>
           <Grid item xs={6}>
               <FormControl fullWidth >
                   <InputLabel>Type</InputLabel>
                   <Select value={formData.type} onChange={(e) => setFormData({...formData, type:e.target.value})}>
                       <MenuItem value="Income">Income</MenuItem>
                       <MenuItem value="Expense">Expense</MenuItem>
                   </Select>
               </FormControl>
           </Grid>
           <Grid item xs={6}>
               <FormControl fullWidth>
                   <InputLabel>Category</InputLabel>
                   <Select value={formData.category} onChange={(e) => setFormData({...formData, category:e.target.value})}>
                       { selectedCategories.map((category) =>(
                           <MenuItem key= {category.type} value={category.type}>{category.type}</MenuItem>
                       ))}
                   </Select>
               </FormControl>
           </Grid>
           <Grid item xs={6}>
               <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({...formData, amount:e.target.value})}/>
           </Grid>
           <Grid item xs={6}>
               <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({...formData, date: FormatDate(e.target.value)})}/>
           </Grid>
           <Button className={classes.button} variant="outlined" color="white" fullWidth onClick={createTransaction}>Craete</Button>
       </Grid>
    )
}

export default Form
