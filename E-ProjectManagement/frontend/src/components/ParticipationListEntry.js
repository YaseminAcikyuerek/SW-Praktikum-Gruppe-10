import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParticipationForm from './dialogs/ParticipationForm';
import ParticipationDeleteDialog from './dialogs/ParticipationDeleteDialog';
import ParticipationList from "./ParticipationList";



/**
 * Renders a PersonBO object within a expandable/collapsible PersonListEntry with the person manipulation
 * functions.
 *
 *
 *

 */
class ParticipationListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      participation: props.participation,
      showParticipationForm: false,
      showParticipationDeleteDialog: false,
    };
  }



  /** Handles the onClick event of the edit Person button */
  editParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationForm: true
    });
  }

  /** Handles the onClose event of the PersonForm */
  participationFormClosed = (participation) => {
    // participation is not null and there for changed
    if (participation) {
      this.setState({
        participation: participation,
        showParticipationForm: false
      });
    } else {
      this.setState({
        showParticipationForm: false
      });
    }
  }

  /** Handles the onClick event of the delete participation button */
  deleteParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationDeleteDialog: true
    });
  }

  /** Handles the onClose event of the PersonDeleteDialog */
  deleteParticipationDialogClosed = (participation) => {
    // if participation is not null, delete it
    if (participation) {
      this.props.onParticipationDeleted(participation);
    }

    // Don´t show the dialog
    this.setState({
      showParticipationDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes} = this.props;
    // Use the states participation
    const { participation, showParticipationForm, showParticipationDeleteDialog } = this.state;

    return (
      <div>
        <Accordion >
          <AccordionSummary >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                  Projekt:  {participation.getProject()},<br></br>
                  Student:  {participation.getStudent()},<br></br>
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editParticipationButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteParticipationButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          </AccordionSummary>
        </Accordion>
        <ParticipationForm show={showParticipationForm} participation={participation} onClose={this.participationFormClosed} />
        <ParticipationDeleteDialog show={showParticipationDeleteDialog} participation={participation} onClose={this.deleteParticipationDialogClosed} />
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
ParticipationListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ParticipationBO to be rendered */
  participation: PropTypes.object.isRequired,

  /**
   *  Event Handler function which is called after a sucessfull delete of this person.
   *
   * Signature: onParticipationDelete(ParticipationBO participation)
   */
  onParticipationDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ParticipationListEntry);