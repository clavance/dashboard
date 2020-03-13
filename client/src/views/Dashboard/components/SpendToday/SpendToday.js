import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar
} from '@material-ui/core';
import MoneyOff from '@material-ui/icons/MoneyOff';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const SpendToday = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  var spend_today;

  if (!isNaN(props.spendToday))
    spend_today = props.spendToday;
  else
    spend_today = null;


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
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              SPENT TODAY
            </Typography>
            <Typography variant="h3">£{spend_today}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyOff className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SpendToday.propTypes = {
  className: PropTypes.string
};

export default SpendToday;
