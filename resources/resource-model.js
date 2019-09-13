const db = require("../data/dbConfig.js");

module.exports = {
    getResources,
    addResource,
    getResourceById,
    updateResources,
    removeResources
}

function getResources() {
    return db("resources")
}

function addResource(resource) {
    return db("resources").insert(resource).then(ids => {
        return getResourceById(ids[0]);
    });
}

function getResourceById(id) {
    return db("resources")
        .where("id", id).first();
}

function updateResources(id, changes) {
    return db("resources")
        .where({ id })
        .update(changes)
        .then(_ => getResourceById(id))
}

function removeResources(id) {
    return db("resources")
        .where('id', id)
        .del();
}
