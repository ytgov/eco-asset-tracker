import * as knex from "knex";

exports.up = function (knex: knex.Knex, Promise: any) {
  console.log("Creating keys table...");
  return knex.schema.createTable("keys", function (table) {
    table.string("_id").notNullable().primary();
    table.string("code");
    table.string("number");
    table.string("status");
    table.integer("assignedUser");
    table.string("notes");

    //audit
    //audit
    table.date("modified");
    table.string("modified_by");
  });
};

exports.down = function (knex: knex.Knex, Promise: any) {
  console.log("Dropping keys table...");
  return knex.schema.dropTable("keys");
};
