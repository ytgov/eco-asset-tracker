import * as knex from "knex";


exports.up = function (knex: knex.Knex, Promise: any) {
  console.log ("Creating personnel table...")
  return knex.schema.createTable("personnel", function (table) {
  table.increments('_id').primary()
  table.string('first_name');
  table.string('last_name');
  table.string('ynet_id');
  table.string('email');
  table.string('display_name');
  table.string("title");
  table.string("department")

  //audit
  table.string("updated_by");

  //audit
  table.timestamps()
  })
}

exports.down = function (knex: knex.Knex, Promise: any) {
  console.log('Dropping personnel table');
  return knex.schema.dropTable("personnel");
}