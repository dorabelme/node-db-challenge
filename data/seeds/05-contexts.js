exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('contexts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('contexts').insert([
        { name: "At work" },
        { name: "At home" },
        { name: "At computer" }
      ]);
    });
};
