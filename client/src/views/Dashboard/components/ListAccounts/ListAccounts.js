import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 500
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const ListAccounts = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="All Accounts" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Account Holder</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Sort Code</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                  <TableRow>
                    <TableCell>{props.accountHolder}</TableCell>
                    <TableCell>{props.accountCurrency}</TableCell>
                    <TableCell>{props.accountNumber}</TableCell>
                    <TableCell>{props.sortCode}</TableCell>
                  </TableRow>

              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

ListAccounts.propTypes = {
  className: PropTypes.string
};

export default ListAccounts;
