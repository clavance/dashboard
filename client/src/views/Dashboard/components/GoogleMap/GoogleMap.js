import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import MapContainer from '../MapContainer';

const useStyles = makeStyles(() => ({
  root: {},
  mapContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const GoogleMap = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Latest Transaction"
      />
      <Divider />
      <CardContent>
        <div className={classes.mapContainer}>
          <MapContainer
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

GoogleMap.propTypes = {
  className: PropTypes.string
};

export default GoogleMap;
