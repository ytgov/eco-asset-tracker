import {Room} from "./eco-room"
// export interface Key {
//   _id: Number;
//   code: String;
//   number: String;
//   room: JSON;
//   status: keyStatus; // from a list of enumKeyStatuses
//   assignedUser: JSON; //connected to an employee
//   notes: String;
// }

export class Key {
  constructor() {
    this._id= 0;
    this.code="";
    this.number= "";
    this.room=""
    this.status = keyStatus["Not assigned"];
    this.assignedUser= "";
    this.notes="";
  }
  _id: Number;
  code: String;
  number: String;
  room: String;
  status: keyStatus; // from a list of enumKeyStatuses
  assignedUser: Object; //connected to an employee
  notes: String;


}

export enum keyStatus {
  "Assigned" = "Assigned",
  "Not assigned" = "Not assigned",
  "Obselete" = "Obselete",
  "Lost" = "Lost",
  "Broken" = "Broken",
}