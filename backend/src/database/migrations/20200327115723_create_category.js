exports.up = function(knex) {
    return knex.schema.createTable('Category', function (table){
  
      table.increments();
      table.string('CategoryName').notNullable();
     
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Category');
    
  };
  