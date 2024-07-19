import express from "express"
import { genders } from "./src/utils/data.js"

const app = express();

app.use(express.json());

app.post("/genders", (req, res) => {
    const { name, description } = req.body;

    const noName = !name;
    const invalidName = typeof name !== "string" || !/^[a-zA-ZÀ-ú]+$/.test(name);
    const duplicatedName = genders.some(item => item.name === name);
    const noDescription = !description;
    const invalidDescription = typeof (description) !== "string" || !/^[a-zA-ZÀ-ú\s,.!?-]+$/.test(description);

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
    }

    try {
        const nextId = genders.length.toString();

        const newGender = {
            id: nextId,
            name,
            description
        };

        genders.push(newGender);

        res.status(200).json({
            message: `Gênero '${name}' adicionado com sucesso!`,
            newGender: newGender,
            genders: genders
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Não foi possível adicionar novo gênero.");
    }
})

app.listen(3000, () => {
    console.log("Servidor em andamento em http://localhost:3000");
})