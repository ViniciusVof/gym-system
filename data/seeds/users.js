const bcrypt = require("bcrypt");

const saltRounds = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const cryptedPassword = await bcrypt.hash("12345", saltRounds);
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      fullname: "Vinicius Oliveira de Freitas",
      email: "vinicius.vof@outlook.com",
      password: cryptedPassword,
    },
  ]);
};
