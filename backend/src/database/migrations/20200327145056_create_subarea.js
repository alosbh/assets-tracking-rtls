exports.up = function(knex) {
    return knex.schema.createTable('SubArea', function (table){
  
      table.increments();
      table.string('SubAreaName').notNullable();
      table.integer('AreaID').unsigned().notNullable();
      table.decimal('Width').notNullable();
      table.decimal('Height').notNullable();

      table.foreign('AreaID').references('id').inTable('Area');
     
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('SubArea');
    
  };
  