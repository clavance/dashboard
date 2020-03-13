import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Forecast from 'react-forecast';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  calendar: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center'
  },
  weather: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center'
  }
}));

const CalendarContainer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Calendar"
      />
      <Divider />
      <CardContent>
        <div className={classes.calendar}>
          <Calendar />
        </div>
        <div className={classes.weather}>
          <Forecast latitude={51.520503} longitude={-0.085583} name='London' />
        </div>
      </CardContent>
    </Card>
  );
};

CalendarContainer.propTypes = {
  className: PropTypes.string
};

export default CalendarContainer;
