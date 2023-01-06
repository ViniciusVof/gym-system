const { response } = require('express');
const connection = require('../data/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    async listAll(req, res, next) {
        const users = await connection('users')
            .select('*')

            if (!users) {
                return res.status(400).json({error: 'Nenhum usuário encontrado'});
            }
            return res.status(200).json(users);
    },
    async create(req, res) {
        const { fullname, email, password }  = req.body;
        const user = await connection('users')
        .where('email', email)
        .select('*')
        .first();
        
        if(!user){
            const cryptedPassword = await bcrypt.hash(password, saltRounds);
            const user = await connection('users').insert({
                fullname,
                email,
                password: cryptedPassword
            })
            return res.json({fullname, email});
        } else {
            return res.status(400).json({ error: 'E-mail já cadastrado' });
        }
    },
    async login(req, res) {
        const { email, password } = req.body;
        const user = await connection('users')
            .where('email', email)
            .select('*')
            .first();

            if (!user) {
                return res.status(400).json({error: 'Usuário não existe.'});
            }
            if (await bcrypt.compare(password, user.password)){
                const token = jwt.sign({
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                }, process.env.SECRET, {
                    expiresIn: process.env.JWTExpire * 60
                })
                return res.status(200).json({"Authorization": token});
            }
            return res.status(400).json({error: 'Senha inválida.'});
    }
}