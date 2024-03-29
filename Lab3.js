const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'finallab3',
};

app.use(express.json());

app.post('/crear_persona', async (req, res) => {
  const nombre = req.body.nombre;
  const fecha_nacimiento = req.body.fecha_nacimiento;
  const paisID = req.body.paisID;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('INSERT INTO persona (nombre, fecha_nacimiento, paisID) VALUES (?, ?, ?)', [nombre, fecha_nacimiento, paisID]);
    await connection.end();
    res.status(201).json({ message: 'Persona creada exitosamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear persona:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/eliminar_persona/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('DELETE FROM persona WHERE id = ?', [id]);
    await connection.end();
    res.status(200).json({ message: 'Persona eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta de bienvenida para manejar solicitudes GET a la ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi servidor!');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
