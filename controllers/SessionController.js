const connection = require('../data/config');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        const user = await connection('users')
            .where('email', email)
            .where('password', password)
            .select('*')
            .first();
            if (!user) {
                return res.status(400).json({error: 'Nenhum usuário encontrado'});
            }
            return res.json(user);
    }
}