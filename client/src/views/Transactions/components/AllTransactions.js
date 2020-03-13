import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import transactions from '../../Dashboard/components/RecentTransactions/transactions.json';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1000
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const AllTransactions = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  var transactionsData = JSON.parse(transactions);
  transactionsData.reverse(); //newest transaction first

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="All Transactions"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>

                  <TableCell>Merchant</TableCell>

                  <TableCell>Amount</TableCell>

                  <TableCell>Description</TableCell>

                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>

                  <TableCell>Time</TableCell>

                  <TableCell>Category</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {transactionsData.map(t => (
                  <TableRow>
                    <TableCell>{(() => {
                        if (t.merchant===null)
                          return ("Bank Transfer ("+t.counterparty.name+")")
                        else
                          return t.merchant.name
                        })()}</TableCell>
                      <TableCell>{(() => {
                          if (t.amount < 0)
                            return ("-£"+((t.amount/-100).toFixed(2)))
                          else
                            return ("£"+((t.amount/100).toFixed(2)))
                      })()}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell>{moment(t.created.slice(0,10)).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{moment(t.created).format('LTS')}</TableCell>
                    <TableCell>{(t.category.charAt(0).toUpperCase())+t.category.slice(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          component={Link} to="/dashboard"
          color="primary"
          size="small"
          variant="text"
        >
          Back to Dashboard <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

AllTransactions.propTypes = {
  className: PropTypes.string
};

export default AllTransactions;
