import { Room, Asset} from "../models";


export const assetSeed: Asset[] =
  [
    {
    _id: 1124,
    assetNum: "WS431",
    type: "Infrastructure",
    description: "Computer",
    status: "Installed",
    purchaseDate: new Date("2022-03-25"),
    installDate: new Date("2022-04-15"),
    statusreason: "Some Status reason",
    active: true,
    room: 1166,
    person: 45631,
    note: "Some notes",
    },
    {
    _id: 1125,
    assetNum: "WS5311",
    type: "Infrastructure",
    description: "Pack Pole",
    status: "Installed",
    purchaseDate: new Date("2019-03-25"),
    installDate: new Date("2020-04-15"),
    statusreason: "",
    active: true,
    room: 1166,
    person: 45631,
    note: "A note",
    }
  ]

