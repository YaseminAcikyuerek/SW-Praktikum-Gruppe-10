import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RatingForm from './dialogs/RatingForm';
import RatingDeleteDialog from './dialogs/RatingDeleteDialog';
import RatingList from './RatingList';



class RatingListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      rating: props.rating,
      showRatingForm: false,
      showRatingDeleteDialog: false,
    };
  }



  /** Handles the onClick event of the edit customer button */
  editRatingButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showRatingForm: true
    });
  }

  /** Handles the onClose event of the RatingForm */
  ratingFormClosed = (rating) => {
    // rating is not null and there for changed
    if (rating) {
      this.setState({
        rating: rating,
        showRatingForm: false
      });
    } else {
      this.setState({
        showRatingForm: false
      });
    }
  }

  /** Handles the onClick event of the delete rating button */
  deleteRatingButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showRatingDeleteDialog: true
    });
  }

  /** Handles the onClose event of the RatingDeleteDialog */
  deleteRatingDialogClosed = (rating) => {
    // if rating is not null, delete it
    if (rating) {
      this.props.onRatingDeleted(rating);
    }

    // Don´t show the dialog
    this.setState({
      showRatingDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    // Use the states rating
    const { rating, showRatingForm, showRatingDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion>
          <AccordionSummary>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                  Projekt:  {rating.getProject()},<br></br>
                  Prüfer:   {rating.getEvaluator()},<br></br>
                  Geprüfter:{rating.getToBeAssessed()},<br></br>
                  Note:     {rating.getGrade()},<br></br>
                  Bestanden:{rating.getPassed()}<br></br>
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editRatingButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteRatingButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          </AccordionSummary>
        </Accordion>
        <RatingForm show={showRatingForm} rating={rating} onClose={this.ratingFormClosed} />
        <RatingDeleteDialog show={showRatingDeleteDialog} rating={rating} onClose={this.deleteRatingDialogClosed} />
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
RatingListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The RatingBO to be rendered */
  rating: PropTypes.object.isRequired,
  /** The state of this RatingListEntry. If true the rating is shown with its ratings */
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this RatingListEntry
   *
   * Signature: onExpandedStateChange(RatingBO rating)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this rating.
   *
   * Signature: onRatingDelete(RatingBO rating)
   */
  onRatingDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(RatingListEntry);
