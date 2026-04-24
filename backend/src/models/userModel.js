const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ifsuldeminas",
  database: "dua_web",
});

exports.findByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

exports.createUser = (user, callback) => {
  // Não especificamos 'role' para respeitar o DEFAULT da tabela
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [user.name, user.email, user.password], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });
};
