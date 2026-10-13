const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Rota para receber os dados, mostrar no terminal e salvar no arquivo
app.post('/api/salvar-localizacao', (req, res) => {
    const { usuario_id, latitude, longitude, precisao, dispositivo, dataHora } = req.body;
    
    // Linha formatada para registo
    const registo = `Nome: ${usuario_id} | Data: ${dataHora} | Lat: ${latitude} | Lng: ${longitude} | Precisão: ${precisao}m | Dispositivo: ${dispositivo}\n`;

    console.log(`[NOVO REGISTO] ${registo}`);

    // Guarda os dados num ficheiro de texto (compatível com Excel/Word)
    const caminhoFicheiro = path.join(__dirname, 'registos.txt');
    fs.appendFile(caminhoFicheiro, registo, (err) => {
        if (err) {
            console.error('Erro ao salvar o registo:', err);
        }
    });

    res.status(200).json({ status: 'sucesso', mensagem: 'Dados guardados com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});
