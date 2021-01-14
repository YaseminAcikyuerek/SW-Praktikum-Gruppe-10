import  BusinessObject from './BusinessObject';

/**
 * Zeigt eine Teilnahme  am Project an.
 */
export default class ParticipationBO extends BusinessObject {

/**
   *
   *
   */
  constructor(aProject, aStudent) {
    super();
    this.project = aProject;
    this.student = aStudent;
  }

  setProject(aProject) {
  this.project = aProject;
  }

  getProject() {
    return this.project;
  }

  setStudent(aStudent) {
  this.student = aStudent;
  }

  getStudent() {
    return this.student;


  static fromJSON(participations) {

    let result = [];

    if (Array.isArray(participations)) {
      participations.forEach((p) => {
        Object.setPrototypeOf(p, ParticipationBO.prototype);
        result.push(p);
      })
    } else {
      //
      let p = participations;
      Object.setPrototypeOf(p, ParticipationBO.prototype);
      result.push(p);
    }

    return result;
  }

}






