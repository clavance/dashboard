import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalBalance = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  var total_balance;

  if (!isNaN(props.totalBalance))
    total_balance = props.totalBalance;
  else
    total_balance = null;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              TOTAL BALANCE
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              £{total_balance}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalBalance.propTypes = {
  className: PropTypes.string
};

export default TotalBalance;
