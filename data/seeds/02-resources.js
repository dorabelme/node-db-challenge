
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        { name: "People" },
        { name: "Photo editor", description: "Adobe PhotShop" },
        { name: "MacBook Pro", description: "2016" },
        { name: "iPhone" }
      ]);
    });
};
