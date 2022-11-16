import * as knex from "knex";

exports.up = function (knex: knex.Knex, Promise: any) {
  console.log("Creating users table...");
  return knex.schema.createTable("users", function (table) {
    table.increments("_id").notNullable().primary();
    table.string("display_name").notNullable;
    table.string("email").notNullable();
    table.string("ynet_id");
    table.string("status");
    table.string("roles");
    table.string("title");
    table.string("department");

    //audit
    table.date("modified");
    table.string("modified_by");
    table.date("created_at");
  });
};

exports.down = function (knex: knex.Knex, Promise: any) {
  console.log("Dropping users table");
  return knex.schema.dropTable("users");
};
