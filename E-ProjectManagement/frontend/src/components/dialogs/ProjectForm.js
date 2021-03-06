import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ManagementAPI from '../../api/ManagementAPI';
import ProjectBO from  '../../api/ProjectBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';



class ProjectForm extends Component {

  constructor(props) {
    super(props);

    let n = '', st = '', ow = '', mo= '',pt ='', se='', c='', ep='', sd='', fl='', bblp='', bdlp ='', bdep='', pbdl='', sr='', la='',
    ro='';
    if (props.project) {
      n = props.project.getName();
      st = props.project.getStatus();
      ow = props.project.getOwner();
      mo = props.project.getModule();
      pt = props.project.getProjectType();
      se = props.project.getSemester();
      c = props.project.getCapacity();
      ep = props.project.getExternalPartnerList();
      sd = props.project.getShortDescription();
      fl = props.project.getFlag();
      bblp = props.project.getBdBeforeLecturePeriod();
      bdlp = props.project.getBdDuringLecturePeriod();
      bdep = props.project.getBdDuringExamPeriod();
      pbdl = props.project.getPreferredBdDuringLecturePeriod();
      sr = props.project.getSpecialRoom();
      la = props.project.getLanguage();
      ro = props.project.getRoom();

    }

    // Init the state
    this.state = {
      name: n,
      nameValidationFailed: false,
      nameEdited: false,
      status: st,
      statusValidationFailed: false,
      statusEdited: false,
      owner: ow,
      ownerValidationFailed: false,
      ownerEdited: false,
      module: mo,
      moduleValidationFailed: false,
      moduleEdited: false,
      project_type: pt,
      projectTypeValidationFailed: false,
      projectTypeEdited: false,
      semester: se,
      semesterValidationFailed: false,
      semesterEdited: false,
      capacity: c,
      capacityValidationFailed: false,
      capacityEdited: false,
      externalPartnerList: ep,
      externalPartnerListValidationFailed: false,
      externalPartnerListEdited: false,
      shortDescription: sd,
      shortDescriptionValidationFailed: false,
      shortDescriptionEdited: false,
      flag: fl,
      flagValidationFailed: false,
      flagEdited: false,
      bdBeforeLecturePeriod: bblp,
      bdBeforeLecturePeriodValidationFailed: false,
      bdBeforeLecturePeriodEdited: false,
      bdDuringLecturePeriod: bdlp,
      bdDuringLecturePeriodValidationFailed: false,
      bdDuringLecturePeriodEdited: false,
      bdDuringExamPeriod: bdep,
      bdDuringExamPeriodValidationFailed: false,
      bdDuringExamPeriodEdited: false,
      preferredBdDuringLecturePeriod: pbdl,
      preferredBdDuringLecturePeriodValidationFailed: false,
      preferredBdDuringLecturePeriodEdited: false,
      specialRoom: sr,
      specialRoomValidationFailed: false,
      specialRoomEdited: false,
      language: la,
      languageValidationFailed: false,
      languageEdited: false,
      room: ro,
      roomValidationFailed: false,
      roomEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null

    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the project */
  addProject = () => {
    let newProject = new ProjectBO();
    newProject.setName(this.state.name)
    newProject.setStatus(this.state.status)
    newProject.setOwner(this.state.owner)
    newProject.setModule(this.state.module)
    newProject.setProjectType(this.state.projectType)
    newProject.setSemester(this.state.semester)
    newProject.setCapacity(this.state.capacity)
    newProject.setExternalPartnerList(this.state.externalPartnerList)
    newProject.setShortDescription(this.state.shortDescription)
    newProject.setFlag(this.state.flag)
    newProject.setBdBeforeLecturePeriod(this.state.bdBeforeLecturePeriod)
    newProject.setBdDuringLecturePeriod(this.state.bdDuringLecturePeriod)
    newProject.setBdDuringExamPeriod(this.state.bdDuringExamPeriod)
    newProject.setPreferredBdDuringLecturePeriod(this.state.preferredBdDuringLecturePeriod)
    newProject.setSpecialRoom(this.state.specialRoom)
    newProject.setLanguage(this.state.language)
    newProject.setRoom(this.state.room)
    ManagementAPI.getAPI().addProject(newProject).then(project => {
      // console.log(newProject);
      // Backend call sucessfull
      // reinit the dialogs state for a new empty project
      this.setState(this.baseState);
      this.props.onClose(project); // call the parent with the project object from backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,       // show loading indicator
      updatingError: null             // disable error message
    });
  }

  /** Updates the project */
  updateProject = () => {
    // clone the original project, in case the backend call fails
    let updatedProject = Object.assign(new ProjectBO(), this.props.project);

    // set the new attributes from our dialog
    updatedProject.setName(this.state.name);
    updatedProject.setStatus (this.state.status);
    updatedProject.setOwner (this.state.owner);
    updatedProject.setModule(this.state.module);
    updatedProject.setProjectType (this.state.project_type);
    updatedProject.setSemester(this.state.semester);
    updatedProject.setCapacity(this.state.capacity);
    updatedProject.setExternalPartnerList(this.state.externalPartnerList);
    updatedProject.setShortDescription(this.state.shortDescription);
    updatedProject.setFlag (this.state.flag);
    updatedProject.setBdBeforeLecturePeriod(this.state.bdBeforeLecturePeriod);
    updatedProject.setBdDuringLecturePeriod (this.state.bdDuringLecturePeriod);
    updatedProject.setBdDuringExamPeriod(this.state.bdDuringExamPeriod);
    updatedProject.setPreferredBdDuringLecturePeriod (this.state.preferredBdDuringLecturePeriod);
    updatedProject.setSpecialRoom (this.state.specialRoom);
    updatedProject.setLanguage (this.state.language);
    updatedProject.setRoom (this.state.room);







    ManagementAPI.getAPI().updateProject(updatedProject).then(project => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });

      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.status = this.state.status;
      this.baseState.owner = this.state.owner;
      this.baseState.module = this.state.module;
      this.baseState.project_type = this.state.project_type;
      this.baseState.semester = this.state.semester;
      this.baseState.capacity = this.state.capacity;
      this.baseState.externalPartnerList = this.state.externalPartnerList;
      this.baseState.shortDescription = this.state.shortDescription;
      this.baseState.flag = this.state.flag;
      this.baseState.bdBeforeLecturePeriod = this.state.bdBeforeLecturePeriod;
      this.baseState.bdDuringLecturePeriod = this.state.bdDuringLecturePeriod;
      this.baseState.bdDuringExamPeriod = this.state.bdDuringExamPeriod;
      this.baseState.preferredBdDuringLecturePeriod = this.state.preferredBdDuringLecturePeriod;
      this.baseState.specialRoom = this.state.specialRoom;
      this.baseState.language = this.state.language;
      this.baseState.room = this.state.room;




      this.props.onClose(updatedProject); // call the parent with the new project
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, project, show } = this.props;
    const { name, nameValidationFailed, nameEdited,status, statusValidationFailed, statusEdited,owner, ownerValidationFailed, ownerEdited,module,
      moduleValidationFailed,moduleEdited,project_type, projectTypeValidationFailed, projectTypeEdited, semester, semesterEdited, semesterValidationFailed,capacity,
      capacityValidationFailed, capacityEdited,externalPartnerList, externalPartnerListValidationFailed, externalPartnerListEdited,  shortDescription, shortDescriptionValidationFailed, shortDescriptionEdited, flag, flagValidationFailed, flagEdited,
      bdBeforeLecturePeriod, bdBeforeLecturePeriodValidationFailed, bdBeforeLecturePeriodEdited,bdDuringLecturePeriod, bdDuringLecturePeriodValidationFailed, bdDuringLecturePeriodEdited, bdDuringExamPeriod, bdDuringExamPeriodValidationFailed, bdDuringExamPeriodEdited,preferredBdDuringLecturePeriod, preferredBdDuringLecturePeriodValidationFailed, preferredBdDuringLecturePeriodEdited,
      specialRoom, specialRoomValidationFailed, specialRoomEdited, language, languageValidationFailed, languageEdited, room, roomValidationFailed, roomEdited,
      addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (project) {
      // project defindet, so ist an edit dialog
      title = 'Update a project';
      header = `Project ID: ${project.getID()}`;
    } else {
      title = 'Create a new project';
      header = 'Enter project data';
    }

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='name' label='Name:' value={name}
                onChange={this.textFieldValueChange} error={nameValidationFailed}
                helperText={nameValidationFailed ? 'The name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='status' label='Status:' value={status}
                         onChange={this.textFieldValueChange} error={statusValidationFailed}
                         helperText={statusValidationFailed ? 'The status must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='owner' label='Owner:' value={owner}
                         onChange={this.textFieldValueChange} error={ownerValidationFailed}
                         helperText={ownerValidationFailed ? 'The owner must contain at least one character' : ' '} />

              <TextField autoFocus type='text' required fullWidth margin='normal' id='module' label='Module:' value={module}
                         onChange={this.textFieldValueChange} error={moduleValidationFailed}
                         helperText={moduleValidationFailed ? 'The Module must contain at least one character' : ' '} />

              <TextField type='text' required fullWidth margin='normal' id='project_type' label='Project Type:' value={project_type}
                         onChange={this.textFieldValueChange} error={projectTypeValidationFailed}
                         helperText={projectTypeValidationFailed ? 'The project type must contain at least one character' : ' '} />


              <TextField type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester}
                onChange={this.textFieldValueChange} error={semesterValidationFailed}
                helperText={semesterValidationFailed ? 'The semester must contain at least one character' : ' '} />

              <TextField type='text' required fullWidth margin='normal' id='capacity' label='Capacity:' value={capacity}
                         onChange={this.textFieldValueChange} error={capacityValidationFailed}
                         helperText={capacityValidationFailed ? 'The capacity must contain at least one character' : ' '} />
              <TextField autoFocus type='text' required fullWidth margin='normal' id='externalPartnerList' label='External PartnerList:' value={externalPartnerList}
                         onChange={this.textFieldValueChange} error={externalPartnerListValidationFailed}
                         helperText={externalPartnerListValidationFailed ? 'The external PartnerList must contain at least one character' : ' '} />

              <TextField type='text' required fullWidth margin='normal' id='shortDescription' label='Short Description:' value={shortDescription}
                onChange={this.textFieldValueChange} error={shortDescriptionValidationFailed}
                helperText={shortDescriptionValidationFailed ? 'The short description must contain at least one character' : ' '} />

              <TextField type='text' required fullWidth margin='normal' id='flag' label='Flag:' value={flag}
                         onChange={this.textFieldValueChange} error={flagValidationFailed}
                         helperText={flagValidationFailed ? 'The flag must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='bdBeforeLecturePeriod' label='BlockDays before lecture period:' value={bdBeforeLecturePeriod}
                           onChange={this.textFieldValueChange} error={bdBeforeLecturePeriodValidationFailed}
                           helperText={bdBeforeLecturePeriodValidationFailed ? 'You must contain at least one character' : ' '} />
              <TextField autoFocus type='text' required fullWidth margin='normal' id='bdDuringLecturePeriod' label='BlockDays during lecture period:' value={bdDuringLecturePeriod}
                           onChange={this.textFieldValueChange} error={bdDuringLecturePeriodValidationFailed}
                           helperText={bdDuringLecturePeriodValidationFailed ? 'You must contain at least one character' : ' '} />

              <TextField autoFocus type='text' required fullWidth margin='normal' id='bdDuringExamPeriod' label='BlockDays during exam period :' value={bdDuringExamPeriod}
                onChange={this.textFieldValueChange} error={bdDuringExamPeriodValidationFailed}
                helperText={bdDuringExamPeriodValidationFailed ? 'You must contain at least one character' : ' '} />


              <TextField type='text' required fullWidth margin='normal' id='preferredBdDuringLecturePeriod' label='Preferred BlockDays during lecture period:' value={preferredBdDuringLecturePeriod}
                onChange={this.textFieldValueChange} error={preferredBdDuringLecturePeriodValidationFailed}
                helperText={preferredBdDuringLecturePeriodValidationFailed ? 'You must contain at least one character' : ' '} />


              <TextField autoFocus type='text' required fullWidth margin='normal' id='language' label='Language:' value={language}
                onChange={this.textFieldValueChange} error={languageValidationFailed}
                helperText={languageValidationFailed ? 'The language must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='room' label='Room:' value={room}
                onChange={this.textFieldValueChange} error={roomValidationFailed}
                helperText={roomValidationFailed ? 'The room must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of project prop
              project ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The project ${project.getID()} could not be updated.`} onReload={this.updateProject} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The project could not be added.`} onReload={this.addProject} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a project is given, show an update button, else an add button
              project ?
                <Button disabled={nameValidationFailed || statusValidationFailed ||ownerValidationFailed ||moduleValidationFailed ||projectTypeValidationFailed || semesterValidationFailed || capacityValidationFailed ||
                externalPartnerListValidationFailed || shortDescriptionValidationFailed ||  flagValidationFailed ||bdBeforeLecturePeriodValidationFailed ||bdDuringLecturePeriodValidationFailed ||
                bdDuringExamPeriodValidationFailed ||   preferredBdDuringLecturePeriodValidationFailed ||specialRoomValidationFailed ||
                  languageValidationFailed || roomValidationFailed} variant='contained' onClick={this.updateProject} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited ||statusValidationFailed || !statusEdited ||ownerValidationFailed || !ownerEdited ||
                  moduleValidationFailed || !moduleEdited ||projectTypeValidationFailed || !projectTypeEdited ||semesterValidationFailed || !semesterEdited ||  capacityValidationFailed ||
                  !capacityEdited || externalPartnerListValidationFailed || !externalPartnerListEdited ||shortDescriptionValidationFailed || !shortDescriptionEdited ||flagValidationFailed || !flagEdited ||
                  bdBeforeLecturePeriodValidationFailed || !bdBeforeLecturePeriodEdited || bdDuringLecturePeriodValidationFailed || !bdDuringLecturePeriodEdited ||bdDuringExamPeriodValidationFailed || !bdDuringExamPeriodEdited ||
                  preferredBdDuringLecturePeriodValidationFailed || !preferredBdDuringLecturePeriodEdited || specialRoomValidationFailed || !specialRoomEdited || languageValidationFailed ||
                  !languageEdited || roomValidationFailed || !roomEdited} variant='contained' onClick={this.addProject} color='primary'>
                  Add
             </Button>
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
ProjectForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be edited */
  project: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created ProjectBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(ProjectBO project);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectForm);