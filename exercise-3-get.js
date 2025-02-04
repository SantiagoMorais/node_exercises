import express from "express";
import data from "./src/utils/data.json" assert { type: "json" };

const app = express();

app.get("/genders", (req, res) => {
    try {
        res.status(200).send(data.genders)
    } catch (error) {
        console.log(error);
        res.status(500).send("Não foi possível carregar os gêneros do banco de dados.")
    }
})

app.listen(3000, () => {
    console.log("Servidor em execução em http://localhost:3000");
})