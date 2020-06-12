exports.up = function(knex) {
    return knex.schema.createTable('Tooling', function (table){
  
      table.increments();
      table.integer('BeaconID').notNullable().unsigned();
      table.string('ToolName').notNullable();
      table.string('ToolDescription').notNullable();
      table.integer('SubCategoryID').notNullable().unsigned();

      table.foreign('BeaconID').references('id').inTable('Beacon');
      table.foreign('SubCategoryID').references('id').inTable('SubCategory');
     
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Tooling');
    
  };
  