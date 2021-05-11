import React from 'react'
import { Card, CardContent, CardHeader,Typography, Grid, Divider} from '@material-ui/core'
import  useStyles  from './styles'
import { useContext } from 'react'
import Form from '../Form/Form'
import List from './List/List'
import { ExpenseTrackerContext } from '../../Context/Context'
import InfoCard from '../InfoCard'

const Main = () => {
    const classes = useStyles()
    const { balance } = useContext(ExpenseTrackerContext)
    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="powered by speechly"/>
            <CardContent>
                <Typography variant="h5" align="center">Total Balance: $ {balance}</Typography>
                <Typography variant="subtitle1" style={{marginTop:"20px",lineHeight:"1.5em"}} >
                    <InfoCard/>
                </Typography>
            </CardContent>
            <Divider className={classes.divider}/>
            <Form/>
            <CardContent className={classes.cartContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
