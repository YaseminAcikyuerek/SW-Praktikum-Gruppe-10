import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectForm from './dialogs/ProjectForm';
import ProjectDeleteDialog from './dialogs/ProjectDeleteDialog';
//import ParticipationList from './ParticipationList';
import ProjectList from './ProjectList';


/**
 * Renders a ProjectBO object within a expandable/collapsible ProjectListEntry with the project manipulation
 * functions. If expanded, it renders a ParticipationList.
 */
class ProjectListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: props.project,
      //participations: props.participations,
      showProjectForm: false,
      showProjectDeleteDialog: false,
    };
  }

  /** Handles the onClick event of the edit project button */
  editProjectButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectForm: true
    });
  }

  /** Handles the onClose event of the ProjectForm */
  projectFormClosed = (project) => {
    // project is not null and therefor changed
    if (project) {
      this.setState({
        project: project,
        showProjectForm: false
      });
    } else {
      this.setState({
        showProjectForm: false
      });
    }
  }

  /** Handles the onClick event of the delete project button */
  deleteProjectButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ProjectDeleteDialog */
  deleteProjectDialogClosed = (project) => {
    // if project is not null, delete it
    if (project) {
      this.props.onProjectDeleted(project);
    }

    // Don´t show the dialog
    this.setState({
      showProjectDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes} = this.props;
    // Use the states project
    const { project, showProjectForm, showProjectDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion >
          <AccordionSummary
            id={`project${project.getID()}projectpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                  Projet-ID:      {project.getID()}, <br></br>
                  Projektname:    {project.getName()}, <br></br>
                  Modul:          {project.getOwner()}<br></br>
                  Projekt-Typ:    {project.getProjectType()}<br></br>
                  Semester:       {project.getSemester()}<br></br>
                  Projektinhaber: {project.getOwner()}<br></br>
                  Partner:        {project.getExternalPartnerList()}<br></br>
                  Status:         {project.getOwner()}<br></br>
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editProjectButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteProjectButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          </AccordionSummary>
        </Accordion>
        <ProjectForm show={showProjectForm} project={project} onClose={this.projectFormClosed} />
        <ProjectDeleteDialog show={showProjectDeleteDialog} project={project} onClose={this.deleteProjectDialogClosed} />
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
ProjectListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,


  onProjectDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjectListEntry);
