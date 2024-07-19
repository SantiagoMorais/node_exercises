import express from "express";
import data from "./src/utils/data.json" assert { type: "json" };

const app = express();
app.use(express.json());

app.delete("/genders/:id", (req, res) => {
    const { id } = req.params;
    const updatedId = Number(id)

    try {
        const index = data.genders.findIndex(gender => gender.id === updatedId);

        const invalidIndex = index < 0 || index >= data.genders.length 
        const indexIsNotANumber = typeof updatedId !== "number"

        if (invalidIndex || indexIsNotANumber) {
            return res.status(404).send("Gênero não encontrado.");
        } else {
            data.genders.splice(index, 1)

            return res.status(200).json({
                message: "Gênero deletado com sucesso!",
                genders: data.genders
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Não foi possível deletar este gênero")
    }
})

app.listen(3000, () => {
    console.log("Servidor em execução em http://localhost:3000");
})