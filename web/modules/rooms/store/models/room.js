export class Room {
  constructor(room = {}) {
    this._id = room._id;
    this.name = room.name;
    this.size = room.size;
    this.number = room.number;
    this.status = room.status;
    this.buildingID = room.buildingID;
    this.branchID = room.branchID;
    this.purpose = room.purpose;
    this.notes = room.notes;
    this.modified = room.modified;
    this.modified_by = room.modified_by;
  }
}
