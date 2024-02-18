export class Personnel {
  constructor(data = {}) {
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role;
    this.branchID = data.branchID;
    this.modified = data.modified;
    this.modified_by = data.modified_by;
  }
}
