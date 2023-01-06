const connection = require('../data/config');
module.exports = {
    async listOne(req, res) {
        const { id } = req.params;
        const user = await connection('teachers')
        .where('id', id)
        .select('*')
        .first();

            if (!user) {
                return res.status(400).json({error: 'Nenhum professor encontrado'});
            }

            return res.status(200).json(user);
    },
    async listAll(req, res) {
        const users = await connection('teachers')
            .select('*')

            if (!users) {
                return res.status(400).json({error: 'Algo deu errado na hora da listagem'});
            }
            if(!users.length > 0){
                return res.status(400).json({message: 'Nenhum professor encontrado'});
            }
            return res.status(200).json(users);
    },
    async create(req, res) {
        const { fullname, price_hour }  = req.body;
        const teacher = await connection('teachers')
        .where('fullname', fullname)
        .select('*')
        .first();
        
        if(!teacher){
            const newTeacher = await connection('teachers').insert({
                fullname,
                price_hour,
            })
            if(newTeacher){
                return res.json({fullname, price_hour});
            } else {
                return res.json({error: "Não foi possível cadastrar um novo professor."})
            }
        } 
        return res.status(400).json({ error: 'Professor já existe.' });
    },
    async update(req, res) {
        const { id } = req.params;
        const { fullname, price_hour } = req.body;

        const teacher = await connection('teachers')
        .where('id', id)
        .first();

        if (teacher){
            const updatedTeacher = await connection('teachers').update({
                fullname,
                price_hour
            }).where('id', id);
            if(updatedTeacher){
                return res.json({ fullname, price_hour })
            }
        } else {
            return res.json(400).json({error: "Professor não encontrado."})
        }
    },
    async delete(req, res){
        const { id } = req.params;
        const user = await connection('teachers')
            .where('id', id)
            .first();
        if(user){
            await connection('teachers').where('id', id).delete();
            return res.status(204).send();
        } else {
            return res.status(400).json({error: "Esse professor não existe."})
        }
    }
}