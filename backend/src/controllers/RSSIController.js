const connection = require('.././database/connection')

var knex = require('knex')({
    client: 'mssql',
    connection: {
      host: 'BRBELM0DSQL80',
      database: 'BeaconServer',
      user:     'BEACON_USER',
      password: 'BEACON_USER'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./src/database/migrations'
      // tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  });



const {attachOnDuplicateUpdate} = require('knex-on-duplicate-update');
attachOnDuplicateUpdate();
module.exports = {

        
    async save (request,response){

        
        const {GatewayName, BeaconName, RSSI} = request.body;

        try{
            const Gateway = await connection('Gateway')
                
            .where('GatewayName',GatewayName)
            .select('id')
            .first();
            GatewayID = Gateway.id
            console.log("Gateway:"+GatewayID)
            
            
            const Beacon = await connection('Beacon')
                
            .where('BeaconName',BeaconName)
            .select('id')
            .first();
            
            BeaconID = Beacon.id
            console.log("Beacon:"+BeaconID)
        }
        
        catch(error){
            return response.status(401).json(error)
        }

        try{

            // query = await connection('RSSI').insert({
            //     GatewayID,BeaconID,RSSI
            // });

            query = await connection('RSSI')
            .where({
                'BeaconID':BeaconID,
                'GatewayID':GatewayID
            })
            .select('*')
            .first();

            if(!query){
                const newrssi = await connection('RSSI').insert({
                    BeaconID,
                    GatewayID,
                    RSSI
                })

                return response.json(newrssi);
            }
            else{
                const updaterssi = await connection('RSSI')
                .where({
                    'BeaconID':BeaconID,
                    'GatewayID':GatewayID
                })
                .update({
                    'RSSI': RSSI
                });

                return response.json(updaterssi);
            }
                
            
            
           
        }

        catch(error){
            return response.status(400).json(error)
        }

        return response.status(200).send()
    },

    

    
    async clear(request,response){
        
        await connection('Tooling')
            .del();
            
        return response.status(204).send();
        
    },

    async index (request,response){

        const RSSI = await connection('RSSI')
        // .join('SubCategory', 'SubCategory.id','=','Tooling.SubCategoryID')
        // .join('Category', 'Tooling.SubCategoryID','=','Category.id')
        .select('*');

        return response.json(RSSI);
    }

}