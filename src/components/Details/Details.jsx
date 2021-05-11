import React from 'react'
import { Card, CardContent, CardHeader,Typography} from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import  useStyles  from './styles'
import useTransactions from '../../useTransactions'


const Details = ( {title}) => {
    const { chartData, total } = useTransactions({title})
   
    const classes = useStyles()
    return (
        <Card className={(title==="Income")? classes.income : classes.expense}>
            <CardHeader title={title}/>
            <CardContent>
                <Typography variant="h6">{total}</Typography>
            </CardContent>
            <Doughnut data={chartData}/>

        </Card>
    )
}

export default Details
