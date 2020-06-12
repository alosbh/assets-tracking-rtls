exports.up = function(knex) {
    return knex.schema.createTable('Beacon', function (table){
  
      table.increments();
      table.string('BeaconName').notNullable().unique();
      table.decimal('Battery');
      table.decimal('Minor');
      table.decimal('Major');
      table.decimal('LastUpdated',2);
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Beacon');
    
  };
  