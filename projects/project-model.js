const db = require("../data/dbConfig.js");

module.exports = {
    getProjects,
    addProjects,
    getProjectsById,
    updateProjects,
    removeProjects,
}

function getProjects() {
    return db("projects")
}

function addProjects(project) {
    return db("projects").insert(project).then(ids => {
        return getProjectsById(ids[0]);
    });
}

function getProjectsById(id) {
    return db("projects")
        .where("id", id).first();
}

function updateProjects(id, changes) {
    return db("projects")
        .where({ id })
        .update(changes)
        .then(_ => getProjectsById(id))
}

function removeProjects(id) {
    return db("projects")
        .where('id', id)
        .del();
}
