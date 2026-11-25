const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({ 
  host: 'localhost', 
  user: 'clinica', 
  database: 'clinica' 
});

app.get('/pacientes/:id', (req, res) => {
  const consulta = "SELECT * FROM pacientes WHERE id = ?";
  
  db.query(consulta, [req.params.id], (err, filas) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(filas);
  });
});

app.listen(3000);
