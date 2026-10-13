const express = require('express');
const app = express();

// Define a porta automaticamente para a nuvem ou usa a 3000 localmente
const PORT = process.env.PORT || 3000;

// Permite receber dados em formato JSON e servir a pasta com o HTML
app.use(express.json());
app.use(express.static('public'));

// Rota para receber e mostrar a localização no terminal
app.post('/api/salvar-localizacao', (req, res) => {
    const { usuario_id, latitude, longitude, precisao } = req.body;
    
    // Exibe as coordenadas no terminal assim que chegam
    console.log(`[LOCALIZAÇÃO RECEBIDA] Usuário: ${usuario_id} | Lat: ${latitude}, Lng: ${longitude} | Precisão: ${precisao}m`);

    res.status(200).json({ status: 'sucesso', mensagem: 'Localização recebida!' });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar com sucesso na porta ${PORT}`);
});