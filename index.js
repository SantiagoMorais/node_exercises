import express from "express"
const app = express();
import { STATUS_CODES } from "node:http"
console.log(STATUS_CODES);

app.use(express.json());

let genders = [
    { id: '0', name: 'Terror', description: 'Explore o universo do suspense e do medo, onde cada sombra esconde segredos aterrorizantes.' },
    { id: '1', name: 'Ação', description: 'Mergulhe em uma montanha-russa de adrenalina com explosões, perseguições e reviravoltas eletrizantes.' },
    { id: '2', name: 'Aventura', description: 'Descubra mundos fantásticos e viva histórias épicas repletas de mistérios e desafios.' }
];


app.put('/genders/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedId = Number(id);

    const noName = !name;
    const noDescription = !description;
    const invalidName = typeof name !== "string" || !/^[a-zA-ZÀ-ú\s,.!?-]+$/.test(name);
    const invalidDescription = typeof (description) !== "string" || !/^[a-zA-ZÀ-ú\s,.!?-]+$/.test(description);
    const invalidId = !id || typeof(updatedId) !== "number" || updatedId < 0 || updatedId >= genders.length;
    const duplicatedName = genders.some(gender => gender.name === name)

    switch (true) {
        case noName:
            return res.status(400).send("'Nome' é um campo obrigatório e não pode ficar vazio");
        case noDescription:
            return res.status(400).send("'Description' é um campo obrigatório e não pode ficar vazio");
        case invalidName:
            return res.status(422).send("O campo 'nome' só aceita letras, sem caracteres especiais ou números")
        case invalidDescription:
            return res.status(422).send("O campo 'descrição' só aceita letras, sem caracteres especiais ou números");
        case invalidId:
            return res.status(404).send("Este id não foi encontrado, Por favor, selecione um id já existente.");
        case duplicatedName:
            return res.status(409).send(`O gênero '${name}' já existe no banco de dados. Por favor, atualize-o por outro.`)
    }

    try {
        genders[id].name = name;
        genders[id].description = description;

        res.status(200).json({ message: "Gênero atualizado com sucesso", genderUpdated: genders[id], genders: genders })
    } catch (error) {
        res.status(500).send("Houve algum problema para atualizar o nome e descrição do gênero")
    }
})

app.listen(3000, () => {
    console.log("servidor em execução em http://localhost:3000");
})