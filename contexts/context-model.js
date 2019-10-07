const db = require("../data/dbConfig.js");

module.exports = {
    getContexts,
    addContext,
    getContextById,
    updateContexts,
    removeContexts
}

function getContexts() {
    return db("contexts")
}

function addContext(context) {
    return db("contexts").insert(context).then(ids => {
        return getContextById(ids[0]);
    });
}

function getContextById(id) {
    return db("contexts")
        .where("id", id).first();
}

function updateContexts(id, changes) {
    return db("contexts")
        .where({ id })
        .update(changes)
        .then(_ => getContextById(id))
}

function removeContexts(id) {
    return db("contexts")
        .where('id', id)
        .del();
}
