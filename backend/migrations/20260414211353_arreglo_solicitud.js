/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.table('solicitud_registro', (table) => {
    // .after('tipo') es opcional, sirve para elegir la posición en DB
    table.string('contraseña').notNullable().after('ci')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.table('solicitud_registro', (table) => {
    table.dropColumn('contraseña')
  })
}
