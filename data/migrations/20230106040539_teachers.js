/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("teachers", table => {
        table.increments('id').primary();
        table.string('fullname').notNullable();
        table.float('price_hour').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("teachers");
};
