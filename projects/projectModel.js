const db = require("./dbConfig.js");

module.exports = {
  find,
  findById,
  findResources,
  findTasks,
  add,
  addTask,
  addResource,
  update,
  remove
};

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function findResources(id) {
  return db("resources").where({ id });
}

function findTasks(id) {
  return db("tasks").where({ id });
}

function add(project) {
  return db("projects").insert(project);
}

function addTask(task, id) {
  return db("tasks")
    .where({ id })
    .insert(task);
}

function addResource(resource, id) {
  return db("resources")
    .where({ id })
    .insert(resource);
}

function update(change, id) {
  return db("projects")
    .where({ id })
    .update(change);
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del();
}
