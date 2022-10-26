import * as knex from "knex";

exports.up = function (knex: knex.Knex, Promise: any) {
  console.log("Creating assets table...");
  return knex.schema.createTable("assets", function (table) {
    table.string("_id").notNullable().primary(); //TODO: convert to increment
    table.string("assetNum").notNullable().unique();
    table.string("type");
    table.string("make");
    table.string("model");
    table.string("description");
    table.string("purchaseDate");
    table.string("installDate");
    table.string("installStatus");
    table.string("status");
    table.string("statusReason");
    table.boolean("active");
    table.string("room"); //TODO: Make foreign key (on delete Null)
    table.json("person");
    table.string("note");

    //audit
    table.date("modified");
    table.string("modified_by");
  });
};

exports.down = function (knex: knex.Knex, Promise: any) {
  console.log("Droping assets table...");
  return knex.schema.dropTable("assets");
};
