import express from 'express';
import { getRepository } from 'typeorm';
import Orphanage from './models/Orphanage';

import './database/connection';

const app = express();

app.use(express.json());

// Rota == conjunto
// recurso == usuario
// parametros == 
// metodos HTTP == GET, POST, PUT, DELETE

// por padrao o navegador faz requisicoes do tipo get
// GET == buscar uma informacao (lista, item)
// POST == criando informação nova
// PUT == editando uma info
// DELETE == deletar uma informação
// todos funcionam pra criar rota, porem tem diferenças de semântica/significado

// Query params: http://localhost:3333/users?search=blablabla&page=2
// usado em parametros mais 'opcionais'
// Route Params: http://localhost:3333/users/1 (identificar um recurso)
// Body: http://localhost:3333/users - enviar dados que nao cabem nos parametros acima
// como em formulários


app.post('/orphanages', async (request, response) => {
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    });

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
});

app.listen(3333);

