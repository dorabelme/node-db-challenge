const db = require("../data/dbConfig.js");

module.exports = {
    getTasks,
    getTasksById,
    addTask,
    updateTasks,
    removeTasks,
    findContextsForTasks
}

function getTasks() {
    return db("task as T")
        .innerJoin("projects as P", "T.project_id", "=", "P.id")
        .select("T.id", "P.name as project_name", "P.description as project_description", "T.description", "T.notes", "T.completed")
}

function getTasksById(id) {
    return db("task")
        .where("id", id).first();
}

function addTask(taks) {
    return db("task").insert(taks).then(ids => {
        return getTasksById(ids[0]);
    });
}

function updateTasks(id, changes) {
    return db("task")
        .where({ id })
        .update(changes)
        .then(_ => getTasksById(id))
}

function removeTasks(id) {
    return db("task")
        .where('id', id)
        .del();
}

function findContextsForTasks(id) {
    return db('task_contexts as TC')
        .innerJoin("contexts as C", "C.id", "=", "TC.context_id")
        .select(
            "C.id",
            "C.name",
        )
        .where({ task_id: id });
}