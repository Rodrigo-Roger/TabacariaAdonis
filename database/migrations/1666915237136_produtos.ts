import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome',50).notNullable()
      table.date('validade').notNullable()
      table.string('preco') //pode ser centavos para evitar erro
      table.string('sabor')
      table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedors').notNullable()
      table.integer('marca_id').unsigned().references('id').inTable('marcas').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
