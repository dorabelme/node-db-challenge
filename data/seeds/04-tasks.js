
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('task').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {
          description: 'Hit MVP',
          notes: "Notes 1",
          completed: true,
          project_id: 1
        },
        {
          description: "Write Endpoints",
          notes: "Notes 2",
          completed: true,
          project_id: 1
        },
        {
          description: "Finish Stretch",
          notes: "Notes 3",
          project_id: 1,
          completed: false
        },
        {
          description: 'Repl.it challenges',
          notes: "Everyday",
          project_id: 2,
          completed: false
        },
        {
          description: "HackerRank",
          notes: "Daily",
          project_id: 2,
          completed: false
        },
        {
          description: "Write queries",
          notes: "Joins",
          project_id: 3,
          completed: false
        },
        {
          description: 'Practice database design',
          notes: "Models",
          completed: true,
          project_id: 3
        },
        {
          description: "Collect Photos",
          notes: "MacBook",
          completed: true,
          project_id: 4
        },
        {
          description: "Edit colors",
          notes: "Note 2",
          project_id: 4,
          completed: false
        },
      ]);
    });
};
