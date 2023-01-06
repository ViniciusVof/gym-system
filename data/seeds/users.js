/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { 
      fullname: 'Vinicius',
      email: "vinicius.vof@outlook.com",
      password: 'bcx402200157'
    },
    { 
      fullname: 'Thaila',
      email: "thailataiane@outlook.com",
      password: 'bcx402200157'
    }
  ]);
};
