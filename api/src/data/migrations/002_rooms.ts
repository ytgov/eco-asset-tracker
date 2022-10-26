import * as knex from "knex";

exports.up = function (knex: knex.Knex, Promise: any) {
  return knex.schema.createTable("rooms", function (table) {
    console.log("creating rooms table");
    table.integer("_id").notNullable().primary();
    table.string("name");
    table.integer("size");
    table.string("number");
    table.string("buildingID");
    table.string("branchID");
    table.string("purpose");
    table.string("status");
    table.string("sizes");
    table.string("notes");

    //audit
    table.date("modified");
    table.string("modified_by");
  });
};

exports.down = function (knex: knex.Knex, Promise: any) {
  console.log("dropping rooms table");
  return knex.schema.dropTable("rooms");
};
