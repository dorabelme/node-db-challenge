
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { name: "Finish the Sprint Challenge", description: "Learn database design" },
        { name: "Study Javascript", description: "Practice algorithms" },
        { name: "Practice SQL", description: "SQL queries" },
        { name: "Edit photos" }
      ]);
    });
};
