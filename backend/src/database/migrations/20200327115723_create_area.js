exports.up = function(knex) {
    return knex.schema.createTable('Area', function (table){
  
      table.increments();
      table.string('AreaName').notNullable();
     
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Area');
    
  };
  