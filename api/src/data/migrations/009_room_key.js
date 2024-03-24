exports.up = function (knex) {
  console.log("Creating room to key join table...");
  return knex.schema.createTable("room_key", function (table) {
    table.increments("_id").primary();
    table.string("room_id");
    table.string("key_id");
    // table.string("personnel_id").references("personnel._id"); //foreign key to personnel
    // table.string("room_id").references("rooms._id"); //foreign key to room

    //audit
    table.date("modified");
    table.string("modified_by");
    table.date("created_at");
  });
};

exports.down = function (knex) {
  console.log("Dropping room to key join table");
  return knex.schema.dropTable("room_key");
};
