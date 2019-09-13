
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('task_contexts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('task_contexts').insert([
        { task_id: 1, context_id: 2 },
        { task_id: 1, context_id: 3 },
        { task_id: 2, context_id: 2 },
        { task_id: 2, context_id: 3 },
        { task_id: 3, context_id: 2 },
        { task_id: 3, context_id: 3 },
        { task_id: 4, context_id: 1 },
        { task_id: 4, context_id: 3 },
      ]);
    });
};
