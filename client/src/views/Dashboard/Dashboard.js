import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  CurrentBalance,
  AccountID,
  SpendToday,
  TotalBalance,
  GoogleMap,
  CalendarContainer,
  ListAccounts,
  RecentTransactions
} from './components';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

/* Dashboard is used as a Higher Order Component */
class Dashboard extends Component {
  state = {
    account_id: "",
    account_desc: "",
    account_type: "",
    account_num: "",
    account_currency: "",
    owner_name: "",
    sort_code: "",
    balance: "",
    total_balance: "",
    spend_today: "",
    transactions_data: []
  }

  componentDidMount(){
    fetch("http://localhost:3001/accounts")
    .then(res => res.json())
    .then(data => this.setState({
      account_id: data.account_id,
      account_desc: data.account_desc,
      account_type: data.account_type,
      account_num: data.account_num,
      account_currency: data.account_currency,
      owner_name: data.owner_name,
      sort_code: data.sort_code
    }))
    .catch(err => console.log(err, "Failed to fetch accounts data from backend!"));

    fetch("http://localhost:3001/balance")
    .then(res => res.json())
    .then(data => this.setState({
      balance: data.balance,
      total_balance: data.total_balance,
      spend_today: data.spend_today
    }))
    .catch(err => console.log(err, "Failed to fetch balance data from backend!"));

    fetch("http://localhost:3001/transactions")
    .then(res => res.json())
    .then(data => this.setState({
      transactions_data: data.transactions
    }))
    .catch(err => console.log(err, "Failed to fetch transactions data from backend!"));
  }

  render() {
    const { classes } = this.props;
    const {
      account_id,
      account_desc,
      account_type,
      account_num,
      account_currency,
      owner_name,
      sort_code,
      balance,
      total_balance,
      spend_today,
      transactions_data
    } = this.state;

    /* console.log("Data received from backend: ", this.state); */

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AccountID accID = {account_id} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CurrentBalance currentBalance = {balance}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <SpendToday spendToday = {spend_today}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalBalance totalBalance = {total_balance}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <GoogleMap />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <CalendarContainer />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={3}
            xs={12}
          >
            <ListAccounts
              accountHolder = {owner_name}
              accountCurrency = {account_currency}
              accountNumber = {account_num}
              sortCode = {sort_code}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xl={9}
            xs={12}
          >
             <RecentTransactions transactionsData = {transactions_data}/>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default withStyles(styles)(Dashboard);
