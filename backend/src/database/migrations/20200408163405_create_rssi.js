exports.up = function(knex) {
    return knex.schema.createTable('RSSI', function (table){
  
      
     
      table.integer('GatewayID').notNullable().unsigned().notNullable();
      table.integer('BeaconID').notNullable().unsigned().notNullable();
      table.decimal('RSSI').notNullable();
      table.decimal('LastUpdated');

      table.primary(['GatewayID','BeaconID']);
      table.foreign('GatewayID').references('id').inTable('Gateway');
      table.foreign('BeaconID').references('id').inTable('Beacon');
     
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('RSSI');
    
  };
  