const connection = require('../database/connection')

module.exports = {

    async clear(request,response){
        await connection('Gateway')
            .del();
            
        return response.status(204).send();
        
    },

    async delete (request,response){
        const { id } = request.params;
        
        await connection('Gateway').where('id',id).delete();

        return response.status(204).send();

    } ,

    async update(request,response){

        const{id} = request.params;
        

        const {GatewayName,
                x,
                y,
                LastUpdated,
                SubAreaID} = request.body;
        
        await connection('Gateway')
        .where('id',id)
        .update({GatewayName: GatewayName,
            x: x,
             y:y,
            LastUpdated: LastUpdated,
        SubAreaID: SubAreaID});

        const Gateway = await connection('Gateway')
        .where('id',id)
        .select('*');

        return response.json(Gateway);

    },

    async create (request,response){

        const {GatewayName,x,y,SubAreaID,LastUpdated} = request.body;
        
        
        try{

        const id = await connection('Gateway').returning('*').insert({
            
            GatewayName,
            x,
            y,
            SubAreaID,
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

        const Gateways = await connection('Gateway').select('*');
    
        return response.json(Gateways);
    },

    

}