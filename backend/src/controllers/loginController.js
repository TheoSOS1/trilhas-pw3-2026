const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const SECRET_KEY = "segredo123"; // - Chave secreta para assinalar o token

exports.login = async (req, res) => {
    const { email, password } = req.body;
    userModel.findByEmail(email, (user) => {
        if(!user || user.password !== password){
            return res.status(401).json({
                message: 'Usuário ou Senha incorretos'
            });
        };
    });
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        SECRET_KEY,
        {expiresIn: "1h"}
    );
    res.json({
        message: "Login bem-sucedido",
        token,
    });
};