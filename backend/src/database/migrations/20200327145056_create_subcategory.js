exports.up = function(knex) {
    return knex.schema.createTable('SubCategory', function (table){
  
      table.increments();
      table.string('SubCategoryName').notNullable();
      table.integer('CategoryID').notNullable().unsigned();

      table.foreign('CategoryID').references('id').inTable('Category');
     
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('SubCategory');
    
  };
  