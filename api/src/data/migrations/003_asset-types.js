exports.up = function (knex) {
  console.log("Creating asset-type table...");
  return knex.schema.createTable("asset-type", function (table) {
    table.increments("_id").notNullable().primary();
    table.string("name");
    table.boolean("office");
    table.boolean("person");
    table.boolean("infrastructure");

    //audit
    table.date("modified");
    table.string("modified_by");
  });
};

exports.down = function (knex) {
  console.log("Dropping asset-type table...");
  return knex.schema.dropTable("asset-type");
};
