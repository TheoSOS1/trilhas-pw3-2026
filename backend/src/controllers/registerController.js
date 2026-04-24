const userModel = require('../models/userModel');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  // Verifica se já existe usuário com o email
  userModel.findByEmail(email, (err, existing) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao consultar usuário' });
    }

    if (existing) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Cria usuário (nota: neste exemplo a senha é armazenada em texto plano,
    // manter compatibilidade com o login existente. Em produção, use hashing.)
    const newUser = { name, email, password, role: 'client' };
    userModel.createUser(newUser, (err, insertId) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
      }

      return res.status(201).json({ message: 'Usuário criado com sucesso', id: insertId });
    });
  });
};
