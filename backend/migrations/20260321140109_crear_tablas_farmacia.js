/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('usuarios', (table) => {
      table.integer('ci').primary().unsigned() // Cédula como llave primaria
      table.string('contraseña').notNullable()
      table.string('nombre').notNullable()
      table.string('cargo')
    })
    .createTable('medicamentos', (table) => {
      table.increments('id') // ID autoincrementada
      table.string('nombre').notNullable()
      table.string('alt_nombre')
      table.string('tipo')
    })
    .createTable('lotes', (table) => {
      table.increments('id')
      table
        .integer('medicamento_id')
        .unsigned()
        .references('id')
        .inTable('medicamentos')
      table.string('concentracion')
      table.string('codigo')
      table.date('vencimiento')
      table.integer('cantidad').defaultTo(0)
    })
    .createTable('registros', (table) => {
      table.increments('id')
      table
        .integer('medicamento_id')
        .unsigned()
        .references('id')
        .inTable('medicamentos')
      table
        .integer('usuario_id')
        .unsigned()
        .references('ci')
        .inTable('usuarios')
      table
        .integer('lote_id')
        .unsigned()
        .references('id')
        .inTable('lotes')
      table.string('lote_codigo').notNullable()
      table.date('fecha').defaultTo(knex.raw('(CURRENT_DATE)'))
      table.integer('entrada').defaultTo(0)
      table.integer('salida').defaultTo(0)
      table.string('nota')
    })
    .createTable('solicitud_registro', (table) => {
      table.increments('id')
      table.string('nombre')
      table.integer('ci')
    })
    .createTable('pedidos', (table) => {
      table.increments('id').primary()
      table.integer('usuario_id').unsigned().notNullable()
      table
        .foreign('usuario_id')
        .references('ci')
        .inTable('usuarios')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('medicamento_id').unsigned().notNullable()
      table
        .foreign('medicamento_id')
        .references('id')
        .inTable('medicamentos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('lote_id').unsigned().notNullable()
      table
        .foreign('lote_id')
        .references('id')
        .inTable('lotes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('lote_codigo').notNullable()
      table.integer('cantidad').notNullable()
      table.date('fecha').notNullable()
      table.string('estado').notNullable().defaultTo('pendiente') // pendiente, completado, rechazado
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down(knex) {
  return knex.schema
    .dropTableIfExists('pedidos')
    .dropTableIfExists('registros')
    .dropTableIfExists('lotes')
    .dropTableIfExists('medicamentos')
    .dropTableIfExists('usuarios')
    .dropTableIfExists('solicitud_registro')
}
