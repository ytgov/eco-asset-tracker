import { Room, roomPurposes, roomStatuses } from "../models/eco-room"

export const roomSeed: Room[] = [
  {
    _id: 1234,
    buildingID: 123,
    name: "River View" ,
    branchID: 2,
    purpose: roomPurposes["Cubicle"],
    status: roomStatuses["Flex Space"],
    size: 10,
    notes: "This room is currently under construction and will be ready sprint 2023"
  },
  {
    _id: 3123,
    buildingID: 123,
    branchID: 2,
    name: "Erp Room",
    purpose: roomPurposes["Office"],
    status: roomStatuses["Shared"],
    size: 20,
    notes: "Has two TV's and a polycom."
  },
  {
    _id: 5223,
    buildingID: 123,
    branchID: 2,
    name: "Wyatt Room",
    purpose: roomPurposes["Boardroom"],
    status: roomStatuses["Dedicated"],
    size: 5,
    notes: ""
  }
]