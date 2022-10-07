import * as knex from "knex";


exports.up = function (knex: knex.Knex, Promise: any) {
  console.log ("Creating keys table...")
  return knex.schema.createTable("keys", function (table) {
  table.integer('_id').primary()
  table.string('code');
  table.string('number');
  table.string('status');
  table.integer('room'); // TODO: move to a separate table for many to many
  table.integer('assignedUser');
  table.string('notes');

  //audit
  table.timestamps()
  })
}

exports.down = function (knex: knex.Knex, Promise: any) {
  console.log('Dropping keys table');
  return knex.schema.dropTable("keys");
}