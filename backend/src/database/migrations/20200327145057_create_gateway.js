exports.up = function(knex) {
    return knex.schema.createTable('Gateway', function (table){
  
      table.increments();
      table.string('GatewayName').notNullable().unique();
      table.integer('SubAreaID').unsigned();
      table.decimal('x').defaultTo(0);
      table.decimal('y').defaultTo(0);
      table.decimal('LastUpdated',2);
      table.foreign('SubAreaID').references('id').inTable('SubArea');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Gateway');
    
  };
  