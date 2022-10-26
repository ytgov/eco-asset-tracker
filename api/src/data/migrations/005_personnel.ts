import * as knex from "knex";

exports.up = function (knex: knex.Knex, Promise: any) {
  console.log("Creating personnel table...");
  return knex.schema.createTable("personnel", function (table) {
    table.increments("_id").notNullable().primary();
    table.string("first_name");
    table.string("last_name");
    table.string("ynet_id");
    table.string("email");
    table.string("display_name");
    table.string("title");
    table.string("department");

    //audit
    table.date("modified");
    table.string("modified_by");
  });
};

exports.down = function (knex: knex.Knex, Promise: any) {
  console.log("Dropping personnel table");
  return knex.schema.dropTable("personnel");
};
