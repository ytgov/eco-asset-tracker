
export interface Room {
_id: Number; // Primary identifier
number?: String; // room number
name?: String;
buildingID: Number; //potentialy a foreign key to an external API
branchID?: Number; //potentialy a foreign key to an external API
purpose: roomPurposes;
status: roomStatuses;
size?: Number;
notes?: String;
}


export enum roomPurposes {
  "Office" = "Office",
  "Boardroom" = "Boardroom",
  "Cubicle" = "Cubicle",
  "Storage" = "Storage",
  "Common Space" = "Common Space",
  "Other" = "Other"
}

export enum roomStatuses {
  "Hot Desk" = "Hot Desk",
  "Shared" = "Shared",
  "Flex Space" = "Flex Space",
  "Dedicated" = "Dedicated"
}