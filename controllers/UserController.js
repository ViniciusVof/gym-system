const { response } = require('express');
const connection = require('../data/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;
module.exports = {
    async listOne(req, res) {
        const { id } = req.params;
        const user = await connection('users')
        .where('id', id)
        .select('*')
        .first();

            if (!user) {
                return res.status(400).json({error: 'Nenhum usuário encontrado'});
            }
            return res.status(200).json(user);
    },
    async listAll(req, res) {
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
            const newUser = await connection('users').insert({
                fullname,
                email,
                password: cryptedPassword
            })
            if(newUser){
                return res.json({fullname, email});
            } else {
                return res.json({error: "Não foi possível cadastrar um novo usuário."})
            }
        } 
        return res.status(400).json({ error: 'E-mail já cadastrado' });
    },
    async update(req, res) {
        const { id } = req.params;
        const { fullname, email, password } = req.body;

        const user = await connection('users')
        .where('id', id)
        .first();

        if (user){
            const cryptedPassword = await bcrypt.hash(password, saltRounds);
            const updatedUser = await connection('users').update({
                fullname,
                email,
                password: cryptedPassword
            }).where('id', id);
            if(updatedUser){
                return res.json({ fullname, email })
            }
        } else {
            return res.json(400).json({error: "Usuário não encontrado."})
        }
    },
    async delete(req, res){
        const { id } = req.params;
        const user = await connection('users')
            .where('id', id)
            .first();
        if(user){
            await connection('users').where('id', id).delete();
            return res.status(204).send();
        } else {
            return res.status(400).json({error: "Esse usuário não existe."})
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