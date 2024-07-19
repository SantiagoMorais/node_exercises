import express from "express"
import { genders } from "./src/utils/data.js";

const app = express();
app.use(express.json());

app.put('/genders/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedId = Number(id);

    const noName = !name;
    const invalidName = typeof name !== "string" || !/^[a-zA-ZÀ-ú]+$/.test(name);
    const duplicatedName = genders.some(item => item.name === name);
    const noDescription = !description;
    const invalidDescription = typeof (description) !== "string" || !/^[a-zA-ZÀ-ú\s,.!?-]+$/.test(description);
    const invalidId = !id || typeof (updatedId) !== "number" || updatedId < 0 || updatedId >= genders.length;

    switch (true) {
        case noName:
            return res.status(400).send("'Nome' é um campo obrigatório e não pode ficar vazio");
        case invalidName:
            return res.status(422).send("O campo 'nome' só aceita letras, sem caracteres especiais ou números");
        case duplicatedName:
            return res.status(409).send(`O gênero '${name}' já existe no banco de dados. Por favor, atualize-o por outro.`);
        case noDescription:
            return res.status(400).send("'Description' é um campo obrigatório e não pode ficar vazio");
        case invalidDescription:
            return res.status(422).send("O campo 'descrição' só aceita letras, sem caracteres especiais ou números");
        case invalidId:
            return res.status(404).send("Este id não foi encontrado, Por favor, selecione um id já existente.")
    }

    try {
        genders[id].name = name;
        genders[id].description = description;

        res.status(200).json({
            message: "Gênero atualizado com sucesso",
            genderUpdated: genders[id],
            genders: genders
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Houve algum problema para atualizar o nome e descrição do gênero")
    }
})

app.listen(3000, () => {
    console.log("servidor em execução em http://localhost:3000");
})