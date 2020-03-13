import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import AllTransactions from './components';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

const Transactions = props => {
  const { classes } = props;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <AllTransactions />
          </Grid>
        </Grid>
      </div>
    );
};

export default withStyles(styles)(Transactions);
