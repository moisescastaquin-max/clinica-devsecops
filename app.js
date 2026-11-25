// ❌ ANTES (Vulnerable a Inyección SQL)
app.get('/pacientes/:id', (req, res) => {
  // Concatenación directa: si id = "1 OR 1=1", devuelve toda la tabla
  const consulta = "SELECT * FROM pacientes WHERE id = " + req.params.id;
  
  db.query(consulta, (err, filas) => res.json(filas));
});


// ✅ DESPUÉS (Seguro con consulta parametrizada)
app.get('/pacientes/:id', (req, res) => {
  // Uso de placeholder (?) y arreglo de valores separados
  const consulta = "SELECT * FROM pacientes WHERE id = ?";
  
  db.query(consulta, [req.params.id], (err, filas) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(filas);
  });
});
