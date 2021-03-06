import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonForm from './dialogs/PersonForm';
import PersonListEntry from './PersonListEntry';

/**
 * Controlls a list of PersonListEntrys to create a accordion for each person.
 */
class PersonList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      persons: [],
      filteredPersons: [],
      personFilter: '',
      error: null,
      loadingInProgress: false,
      showPersonForm: false
    };
  }

  /** Fetches all PersonBOs from the backend */
  getPersons = () => {
    ManagementAPI.getAPI().getPersons().then(personBOs =>
        this.setState({               // Set new state when PersonBOs have been fetched
          persons: personBOs,
          filteredPersons: [...personBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            persons: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getPersons();
  }


  /**
   * Handles onPersonDeleted events from the PersonListEntry component
   *
   * @param {person} PersonBO of the PersonListEntry to be deleted
   */
  personDeleted = person => {
    const newPersonList = this.state.persons.filter(personFromState => personFromState.getID() !== person.getID());
    this.setState({
      persons: newPersonList,
      filteredPersons: [...newPersonList],
      showPersonForm: false
    });
  }

  /** Handles the onClick event of the add person button */
  addPersonButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the PersonForm
    this.setState({
      showPersonForm: true
    });
  }

  /** Handles the onClose event of the PersonForm */
  personFormClosed = person => {
    // person is not null and therefore created
    if (person) {
      const newPersonList = [...this.state.persons, person];
      this.setState({
        persons: newPersonList,
        filteredPersons: [...newPersonList],
        showPersonForm: false
      });
    } else {
      this.setState({
        showPersonForm: false
      });
    }
  }

  /** Handels onChange events of the person filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredPersons: this.state.persons.filter(person => {
        let nameContainsValue = person.getName().toLowerCase().includes(value);
        //let roleContainsValue = person.getRole().toLowerCase().includes(value);
        let emailContainsValue = person.getEmail().toLowerCase().includes(value);
        let googleUserIdContainsValue = person.getGoogleUserId().toLowerCase().includes(value);


        return nameContainsValue || /*** || emailContainsValue **/ googleUserIdContainsValue ;
      }),
      personFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredPersons: [...this.state.persons],
      personFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredPersons, personFilter, expandedPersonID, loadingInProgress, error, showPersonForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.personFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter person list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='personFilter'
              type='text'
              value={personFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addPersonButtonClicked}>
              Add Person
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of PersonListEntry components
          // Do not use strict comparison, since expandedPersonID maybe a string if given from the URL parameters
          filteredPersons.map(person =>
            <PersonListEntry key={person.getID()} person={person}
              onPersonDeleted={this.personDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of persons could not be loaded.`} onReload={this.getPersons} />
        <PersonForm show={showPersonForm} onClose={this.personFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  personFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
PersonList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(PersonList));