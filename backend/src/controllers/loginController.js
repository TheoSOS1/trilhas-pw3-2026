const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const SECRET_KEY = "segredo123";

exports.login = (req, res) => {
  // Removi o async pois você está usando callback
  const { email, password } = req.body;

  userModel.findByEmail(email, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao consultar usuário" });
    }

    // 1. Verificamos se o usuário existe e a senha bate
    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Usuário ou Senha incorretos",
      });
    }

    // 2. O token DEVE ser gerado aqui dentro, onde o 'user' é conhecido
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" },
    );

    // 3. A resposta de sucesso também fica aqui dentro
    return res.json({
      message: "Login bem-sucedido",
      token,
      role: user.role,
    });
  });
};
