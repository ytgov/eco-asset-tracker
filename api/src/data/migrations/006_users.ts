import * as knex from "knex";

exports.up = function (knex: knex.Knex, Promise: any) {
  console.log("Creating users table...");
  return knex.schema.createTable("users", function (table) {
    //table.increments("_id")
    table.string("first_name");
    table.string("last_name");
    table.string("ynet_id").unique();
    table.string("email").unique().notNullable();
    table.string("display_name");
    table.string("title");
    table.string("department");
    table.string("roles");
    table.string("status");
    table.string("sub");

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
