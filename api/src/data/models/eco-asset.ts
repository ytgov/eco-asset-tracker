import { Room } from "./eco-room";
import { Employee } from "./employee";

export interface Asset {
  _id: Number; //primary key
  assetNum?: String; //<- primary key?
  type: String;
  make?: String; //
  model?: String; //<- model
  description?: String;
  purchaseDate?: Date;
  installDate?: Date;
  installStatus?: assetStatus;
  // status: assetStatus
  status: String;
  statusreason: String;
  active: Boolean;
  room: Room["_id"];
  // person: Employee["_id"];
  person: JSON;
  note: String;
}

export enum assetStatus {
  "Assigned" = "Assigned",
  "Unassigned" = "Unassigned",
  "Unavailable" = "Unavailable",
}

export class AssetType {
  constructor() {
    this._id = 0;
    this.name = "";
    this.office = false;
    this.person = false;
    this.infrastructure = false;
  }
  _id: number;
  name: string;
  office: boolean; // is this a foreign key?
  person: boolean; // is this a foreign key?
  infrastructure: boolean; // is this a foreign key?
}

export const assetTypeList: AssetType[] = [
  {
    _id: 0,
    name: "Cell Phone",
    office: true,
    person: false,
    infrastructure: false,
  },
  {
    _id: 1,
    name: "Laptop",
    office: true,
    person: true,
    infrastructure: false,
  },
  {
    _id: 2,
    name: "Landline",
    office: false,
    person: false,
    infrastructure: true,
  },
  {
    _id: 3,
    name: "Pack Pole",
    office: false,
    person: false,
    infrastructure: true,
  },
];
