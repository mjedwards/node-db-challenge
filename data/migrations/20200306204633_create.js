exports.up = async function(knex) {
  return await knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .text("project_name", 128)
        .unique()
        .notNullable();
      tbl.text("description");
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl
        .text("task_name")
        .unique()
        .notNullable();
      tbl.text("description").notNullable();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .text("resource_name")
        .notNullable()
        .unique();
      tbl
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("task_id")
        .unsigned()
        .references("id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tasks").dropTableIfExists("projects");
};
