import express, { Request, Response } from "express";
import { assetTypeList, AssetType } from "../data/models/eco-asset";
import { assetSeed } from "../data/seed-data/eco-asset";
import { KnexService } from "../services/knex-service";

export const assetsRouter = express.Router();

const db = new KnexService("assets");
const dbAssetType = new KnexService("asset-type");

assetsRouter.get("/types", async (req: Request, res: Response) => {
  const query = {};
  const fields = req.body.fields;
  let result = await dbAssetType.getAll(query, fields);
  return res.json(result);
});
assetsRouter.post("/types", async (req: Request, res: Response) => {
  const data = req.body;
  let result = await dbAssetType.create(data);
  return res.json(result);
});
assetsRouter.get("/", async (req: Request, res: Response) => {
  const query = {};
  const fields = req.body.fields; // if null return all fields
  // const result = await knex.select(fields).from(tableName);

  let result = await db.getAll(query, fields);
  return res.json(result);
  // return res.json(assetSeed)
});

assetsRouter.get("/:assetID", async (req: Request, res: Response) => {
  const assetID = req.params.assetID;
  const fields = req.body.fields; // if null return all fields
  // const result = await knex.select(fields).from(tableName).where({_id: assetID})
  const result = await db.getAll({ _id: assetID }, fields);
  if (result.length === 0) {
    res.status(404).send(`No results found for asset ID: ${assetID}`);
  } else if (result.length === 1) {
    return res.json(result[0]);
  } else {
    return res
      .status(418)
      .send(`Too many results found for asset ID: ${assetID}`);
  }
});
assetsRouter.put("/:assetID", async (req: Request, res: Response) => {
  //update a asset
  const assetID = req.params.assetID;
  const asset = req.body;
  const result = await db.update({ _id: assetID }, asset);
  return res.json(result);
});
assetsRouter.delete("/:assetID", async (req: Request, res: Response) => {
  const assetID = req.params.assetID;
  const result = await db.delete({ _id: assetID });
  return res.json(result);
});

assetsRouter.post("/", async (req: Request, res: Response) => {
  //create a new asset

  const asset = req.body;
  let result = await db.create(asset);
  console.log(result);
  return res.json(result);
});
