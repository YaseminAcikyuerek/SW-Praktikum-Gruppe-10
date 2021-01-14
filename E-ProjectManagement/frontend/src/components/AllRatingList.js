import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { ManagementAPI } from './api/';
import ContextErrorMessage from './Dialogs/ContextErrorMessage';
import LoadingProgress from './Dialogs/LoadingProgress';
/**import Detail from './AccountDetail';

/**
 * Shows all accounts of the bank.
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class AllRatingList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      ratings: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadAccounts();
  }

  /** gets the account list for this account */
  loadAccounts = () => {
    ManagementAPIAPI.getAPI().getAllRatings().then(ratings =>
      this.setState({
        ratings: ratings,
        loadingInProgress: false, // loading indicator
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { accounts, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            ratings.map(rating => <RatingDetail key={rating.getID()}
            ratingID={rating.getOwner().toString()} ratingID={account.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all accounts of the bank could not be loaded.`} onReload={this.loadAccounts} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
AllRatingList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllRatingList);