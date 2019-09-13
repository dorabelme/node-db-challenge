const db = require("../data/dbConfig.js");

module.exports = {
    getProjects,
    addProjects,
    getProjectsById,
    updateProjects,
    removeProjects,
    findTasksForProject,
    findResourcesForProject
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

function findTasksForProject(id) {
    return db('projects as P')
        .innerJoin("task as T", "T.project_id", "=", "P.id")
        .select(
            "T.id",
            "T.description",
            "T.notes",
            "T.completed"
        )
        .where({ project_id: id });
}

function findResourcesForProject(id) {
    return db('project_resources as PR')
        .innerJoin("resources as R", "R.id", "=", "PR.resource_id")
        .select(
            "R.id",
            "R.name",
            "R.description"
        )
        .where({ project_id: id });
}

