import express from "express";
import data from "./src/utils/data.json" assert { type: "json" }

const app = express();
app.use(express.json());

app.get("/movies", (req, res) => {
    const totalMovies = data.movies.length;
    const totalDuration = data.movies.reduce((acc, item) => {
        return acc + item.duration
    }, 0);
    const averageDuration = totalDuration / totalMovies;
    
    try {
        res.status(200).json({
            totalMovies: totalMovies,
            averageDuration: averageDuration,
            movies: data.movies
        });

    } catch (error) {
        res.status(500).send("Erro ao listar todos os filmes.");
    }
});

app.listen(3000, () => {
    console.log("Servidor em execução em http://localhost:3000");
});