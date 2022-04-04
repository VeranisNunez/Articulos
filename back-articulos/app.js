const express = require('express')
const mysql = require('mysql')
const cors = require("cors");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4000
const app = express()
app.use(cors());
app.use(bodyParser.json())

//Conexion MySQl
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'articulos-bd'
});
 

//Consultas
//Obtener todos los artículos
app.get('/articulos', (req, res) => {
  const consulta = 'SELECT * FROM articulos';
  connection.query(consulta, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results)
    }else{
      res.send('No hay artículos disponibles')
    }
  })
});

//Obtener un artículo
app.get('/articulos/:id', (req, res) => {
  const { id } = req.params
  const consulta = `SELECT * FROM articulos WHERE id=${id}`;
  connection.query(consulta, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results)
    }else{
      res.send('No se encontró el artículo')
    }
  })
});

//Agregar artículo
app.post('/agregar', (req, res) => {
  const data = {
    descripcion: req.body.descripcion, 
    precio: req.body.precio, 
    estado: req.body.estado
  }
  const consulta = 'INSERT INTO articulos SET ?';
  connection.query(consulta, data, (error) => {
    if (error) throw error;
    res.send('Artículo creado')
  })
});

//Actualizar artículo
app.put('/actualizar/:id', (req, res) => {
  const { id } = req.params
  const { descripcion, precio, estado } = req.body
  const consulta = `UPDATE articulos SET descripcion='${descripcion}', precio='${precio}', estado='${estado}' WHERE id=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send('Artículo actualizado')
  })
});

//Actualizar estado de un artículo
app.put('/actualizar/:id/estado', (req, res) => {
  const { id } = req.params
  const { estado } = req.body
  const consulta = `UPDATE articulos SET estado='${estado}' WHERE id=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send('Estado de artículo actualizado')
  })
});

//Eliminar artículo
app.delete('/eliminar/:id', (req, res) => {
  const { id } = req.params
  const consulta = `DELETE FROM articulos WHERE id=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send('Artículo eliminado')
  })
});


//Validar conexion
connection.connect(error => {
  if (error) throw error;
  console.log('DATABASE IS CONNECTED');
});
app.listen(PORT, () => console.log(`SERVER ON PORT = ${PORT}`));

// connection.end();