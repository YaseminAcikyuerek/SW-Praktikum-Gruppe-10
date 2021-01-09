import  NamedBusinessObject from './NamedBusinessObject';

/**
 * .
 */
export default class ModuleBO extends NamedBusinessObject {

/**
   *
   *
   */
  constructor(aEdv_nr) {
    super();
    this.edv_nr = aEdv_nr;
  }

  setEdvNr(aEdv_nr) {
  this.edv_nr = aEdv_nr;
  }

  getEdvNr() {
    return this.edv_nr
  }

  static fromJSON(modules) {
    let result = [];

    if (Array.isArray(modules)) {
      modules.forEach((c) => {
        Object.setPrototypeOf(c, ModuleBO.prototype);
        result.push(c);
      })
    } else {
      //
      let c = modules;
      Object.setPrototypeOf(c, ModuleBO.prototype);
      result.push(c);
    }

    return result;
  }





