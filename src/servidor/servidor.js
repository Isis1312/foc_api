const express = require('express');
const cors = require('cors');

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());

//prueba get
app.get('/', (req, res) => {
    res.json({
        mensaje:'probando get'
    });
 });

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
