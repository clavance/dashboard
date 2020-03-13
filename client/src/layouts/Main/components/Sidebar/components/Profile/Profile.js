import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: theme.spacing(1)
  }
});

class Profile extends Component {
  state = {
    owner_name: ""
  }

  componentDidMount(){
    fetch("http://localhost:3001/accounts")
    .then(res => res.json())
    .then(data => this.setState({
      owner_name: data.owner_name,
    }))
    .catch(err => console.log(err, "Failed to fetch accounts data from backend!"));
  }

  render() {

    const { classes, className, ...rest } = this.props;
    const { owner_name } = this.state;

    const user = {
      name: owner_name,
      avatar: '/images/avatars/monzo.png',
      bio: 'Software Engineer'
    };

    return (
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          variant='square'
          to="/sign-in"
        />
        <Typography
          className={classes.name}
          variant="h4"
        >
          {user.name}
        </Typography>
        <Typography variant="body2">{user.bio}</Typography>
      </div>
    );
  }
};

Profile.propTypes = {
  className: PropTypes.string
};

export default withStyles(styles)(Profile);
