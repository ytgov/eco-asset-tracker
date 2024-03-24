exports.up = function (knex) {
  console.log("Creating personnel room join table...");
  return knex.schema.createTable("personnel_room", function (table) {
    table.increments("_id").primary();
    table.string("personnel_id");
    table.string("room_id");
    // table.string("personnel_id").references("personnel._id"); //foreign key to personnel
    // table.string("room_id").references("rooms._id"); //foreign key to room

    //audit
    table.date("modified");
    table.string("modified_by");
    table.date("created_at");
  });
};

exports.down = function (knex) {
  console.log("Dropping personnel room join table");
  return knex.schema.dropTable("personnel_room");
};
