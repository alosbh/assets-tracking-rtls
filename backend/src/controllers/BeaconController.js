const connection = require('.././database/connection')

module.exports = {

    async clear(request,response){
        await connection('Beacon')
            .del();
            
        return response.status(204).send();
        
    },

    async delete (request,response){
        const { id } = request.params;
        
        await connection('Beacon').where('id',id).delete();

        return response.status(204).send();

    } ,

    async update(request,response){

        const{id} = request.params;
        

        const {BeaconName,Minor,Major} = request.body;
        
        await connection('Beacon')
        .where('id',id)
        .update({BeaconName: BeaconName,Minor: Minor, Major:Major});

        const beacon = await connection('Beacon')
        .where('id',id)
        .select('*');

        return response.json(beacon);

    },

    async create (request,response){

        const {BeaconName,Battery,Minor,Major,LastUpdated} = request.body;
        
        
        try{

        const id = await connection('Beacon').returning('*').insert({
            
            BeaconName,
            Battery,
            Minor,
            Major,
            LastUpdated,
            
            
        });

        return response.json({id})

        }
        catch(error){
            return response.status(400).send(error)
        }
        

        return response.json(id);

        },


    async index (request,response){

        const Beacons = await connection('Beacon').select('*');
    
        return response.json(Beacons);
    },

    

}