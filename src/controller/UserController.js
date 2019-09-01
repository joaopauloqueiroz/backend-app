const axios = require('axios')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const authConfig = require("../config/auth.json");

module.exports = {
    async store(req, res) {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const { name, username, password } = req.body
        let userExists = await User.findOne({ username: username })
        if(userExists){
           return res.status(400).send({error: 'User exist'})
        }

        try {
            const user = await User.create({
                name,
                username,
                password: hash
            })

            return res.json(user)

        } catch (error) {
            return res.json({ error: 'Error on create user' })
        }
    },
    async login(req, res) {
        const { username, password } = req.body
          //o campo passwor foi marcado como select lá no model, então ele nao viria nessa requisição
          //mas preciso dele para validar, saber se o email e dele realmente, então adiciono esse select no final
          const user = await User.findOne({ username: username})
          //verificar se o usuario existe se não
          if (!user) return res.status(400).send({ error: "User not found!" })
          //verificar se a senha e realmente do email
          //await por que demora então ela não e async por isso precisa
          //bcrypt.compare() por que a senha foi criptografada então tem que comparar com a cript.
          if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).send({ error: "Password is not valid!" })
        
          //remover o password para não retornar para o usuario
          user.password = undefined
        console.log(user)
          //retorna essa informação para o usuario
          res.send({
            user,
            token: generateToken({ id: user.id})
          });
    }
}

// //function para gerar o token
function generateToken(params) {
  return jwt.sign(params, authConfig.secret, {
    //quando o token vai expirar
    // expiresIn: 8600 ///1 dia
  });
}