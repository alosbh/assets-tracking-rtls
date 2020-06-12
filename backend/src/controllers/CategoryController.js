const connection = require('.././database/connection')

module.exports = {


    async create (request,response){

        const {CategoryName} = request.body;
        // const BeaconID = crypto.randomBytes(4).toString('HEX');
        
        const id = await connection('Category').insert({
            
            CategoryName,

        })
        

        return response.json(id);

        },

    async delete (request,response){
        const { id } = request.params;
        
        await connection('Category').where('id',id).delete();

        return response.status(204).send();

    } ,
    async clear(request,response){
        await connection('Category')
            .del();
            
        return response.status(204).send();
        
    },

    async index (request,response){

        const Categories = await connection('Category').select('*');

        return response.json(Categories);
    },
    async update(request,response){

        const{id} = request.params;
        

        const {CategoryName} = request.body;
        
        
        
        await connection('Category')
        .where('id',id)
        .update({CategoryName: CategoryName});

        const category = await connection('Category')
        .where('id',id)
        .select('*');

        return response.json(category);

    }
}