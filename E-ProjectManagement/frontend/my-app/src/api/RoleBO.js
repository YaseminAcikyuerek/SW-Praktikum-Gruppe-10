import NamedBusinessObject from './NamedBusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class RoleBO extends NamedBusinessObject {


constructor(aRoleName, aId) {
    super();
    this.role_name = aRoleName;
    this.id = aId;
  }


  setRoleName(aRoleName) {
    this.role_name = aRoleName;
  }


  getRoleName() {
    return this.role_name;
  }


  setId(aId) {
    this.id = aId;
  }

  /**
   * Gets the lastname.
   */
  getId() {
    return this.id;
  }


  static fromJSON(role) {
    let result = [];

    if (Array.isArray(role)) {
      role.forEach((c) => {
        Object.setPrototypeOf(c, RoleBO.prototype);
        result.push(c);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = role;
      Object.setPrototypeOf(c, RoleBO.prototype);
      result.push(c);
    }

    return result;
  }
}
