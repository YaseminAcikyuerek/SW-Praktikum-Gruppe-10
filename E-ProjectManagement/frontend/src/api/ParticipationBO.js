import  BusinessObject from './BusinessObject';

/**
 * Zeigt eine Teilnahme  am Project an.
 */
export default class ParticipationBO extends BusinessObject {

/**
   *
   *
   */
  constructor(Project, Student) {
    super();
    this.Project = aProject;
    this.Student = aStudent;
  }

  setProject(aProject) {
  this.Project = aProject;
  }

  getProject() {
    return this.Project
  }

  setStudent(aStudent) {
  this.Student = aStudent;
  }

  getStudent() {
    return this.Student


  static fromJSON(participations) {
    let result = [];

    if (Array.isArray(participations)) {
      participations.forEach((c) => {
        Object.setPrototypeOf(c, ParticipationBO.prototype);
        result.push(c);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let c = participations;
      Object.setPrototypeOf(c, ParticipationBO.prototype);
      result.push(c);
    }

    return result;
  }
