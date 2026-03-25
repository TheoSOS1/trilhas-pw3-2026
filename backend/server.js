const express = require('express');

const cors = require('cors');

const loginRoutes = require('./src/routes/loginRoutes');

const app = express();

const PORT = 3000;

// - Middleware
app.use(cors());
app.use(express.json());

// - Routes
app.use('/api/login', loginRoutes);

// - Start do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
});