const connection = require('../database/connection')

module.exports = {


    async create (request,response){

        const {AreaName} = request.body;
        // const BeaconID = crypto.randomBytes(4).toString('HEX');
        
        const id = await connection('Area').insert({
            
            AreaName,

        })
        

        return response.json(id);

        },

    async delete (request,response){
        const { id } = request.params;
        
        await connection('Area').where('id',id).delete();

        return response.status(204).send();

    } ,
    async clear(request,response){
        await connection('Area')
            .del();
            
        return response.status(204).send();
        
    },

    async index (request,response){

        const Areas = await connection('Area').select('*');

        return response.json(Areas);
    },
    async update(request,response){

        const{id} = request.params;
        

        const {AreaName} = request.body;
        
        
        
        await connection('Area')
        .where('id',id)
        .update({AreaName: AreaName});

        const area = await connection('Area')
        .where('id',id)
        .select('*');

        return response.json(area);

    }
}