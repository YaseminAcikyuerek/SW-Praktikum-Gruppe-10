import  BusinessObject from './BusinessObject';




export default class ParticipationBO extends BusinessObject {


  constructor() {
    super();
    this.project = '';
    this.student = '';
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
  }


  static fromJSON(participation) {
    let result = [];
   if (Array.isArray(participation)) {
      participation.forEach((p) => {
        Object.setPrototypeOf(p, ParticipationBO.prototype);
        result.push(p);
      })
   } else {

      let p = participation;
      Object.setPrototypeOf(p, ParticipationBO.prototype);
      result.push(p);
   }
   return result;
  }
}















