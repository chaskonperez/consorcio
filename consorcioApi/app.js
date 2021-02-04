const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fetch = require('node-fetch');

app.use(cors());

app.get('/locales', async (req, res) => {
    const response = await fetch('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7');
    const data = await response.json();

    res.json(data);
});

app.get('/comunas', async (req, res) => {
    const response = await fetch('https://midastest.minsal.cl/farmacias/maps/index.php/utilidades/maps_obtener_comunas_por_regiones', {
        method: 'post',
        body: 'reg_id=7',
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    const data = await response.json();

    res.send(data);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});