/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teachers').del()
  await knex('teachers').insert([
    {fullname: 'Professor A', price_hour: 50.08},
  ]);
};
