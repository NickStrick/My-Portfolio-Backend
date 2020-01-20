
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('contactinfo').del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('contactinfo').insert([
        {
          // id: 1,
          name: 'Nick Stricker',
          phone: '6303333333',
          email: 'strickerdev@gmail.com',
          message: 'when you try to sink, you float'
        }

      ]);
    });
};
