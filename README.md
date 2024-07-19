# Node exercises from DevQuest - Backend development

🧾✍ This is a personal project focused on node / express routes

## Summary

- [General Vision](#general-vision)
  - [Objective](#objective)
- [My Process](#my-process)
  - [Technologies Used](#technologies-used)
  - [Project Functionality](#project-functionality)
  - [Continuous Development](#continuous-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)

## General Vision

### Objective

- Exercise 1: To create a endpoint to update gender informations.

## My Process

### Technologies Used

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The fundamental language of the web, empowering dynamic and interactive functionality across applications with its versatility and wide adoption.
- [Express](https://expressjs.com) - A minimalist and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications, facilitating rapid development and scalability.
- [Node.js](https://nodejs.org) - A runtime environment that allows JavaScript to be executed server-side, enabling developers to build scalable network applications and backend services efficiently.

### Project Functionality

**Exercise 1 - To create a endpoint to update gender informations**

This project utilizes Express.js, Node.js, and Thunder Client for visualizing HTTP requests. An array simulates a database containing names and descriptions of movie genres.

```js
let genders = [
    // the rest of the list.
    { id: '2', name: 'Aventura', description: 'Descubra mundos fantásticos e viva histórias épicas repletas de mistérios e desafios.' }
];
```

The **PUT** method is used to update the database. The endpoint collects the id from request parameters and name and description from the request body. The id is parsed as a number from req.params.

```js
    app.put('/genders/:id', (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedId = Number(id);
    })
```

Various tests are implemented to validate req.body:

- Ensures name input is provided.
- Validates id correctness.
- Checks description for special characters or numbers.

If any of these validations fail, a specific status code is returned to guide the user on fixing the issue.

```js
    const noName = // test logic
    const noDescription = // test logic
    const invalidName = // test logic
    const invalidDescription = // test logic
    const invalidId = // test logic
    const duplicatedName = // test logic

    switch (true) {
        case noName:
            return res.status(400).send("'Nome' é um campo obrigatório e não pode ficar vazio");
        case noDescription:
            return res.status(400).send("'Description' é um campo obrigatório e não pode ficar vazio");
        case invalidName:
            // more validations
    }
```

The try...catch block handles potential errors in the route. Upon passing all tests, the "database" is updated with new data from req.body.

```js   
    try {
        genders[id].name = name;
        genders[id].description = description;

        res.status(200).json({ message: "Gênero atualizado com sucesso", genderUpdated: genders[id], genders: genders })
    } catch (error) {
        res.status(500).send("Houve algum problema para atualizar o nome e descrição do gênero")
    }
```

It's possible to check if the code logic is correct using Thunder Client. It's just necessary to write the route and the method used on it to visualize the result.

![Thunder client window](/src/assets/thunder-client.png)

**Exercise 2 - Creating a new endpoint to add new genders**

The logical to check if the 'description' and 'name' are valid is already done. It's used the same of the **PUT** endpoint. So, it was just necessary to create de endpoint **POST** to add it into the array 'genders'.

```js
    app.post("/genders", (req, res) => {
        //rest of the code

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
            res.status(500).json({ 
                message: "Não foi possível adicionar novo gênero.",
                error: error
            })
        }
    })
```

To be not necessary to add a new id for each new gender added to the database, we used the length of the array 'genders' to be the new id of each new gender.

**Exercise 3 - Creating a endpoint to list all genders**

To list the genders, you need to use the **GET** endpoint and send the response to the user using the **send** method. If the request is successful, the user will be able to see the list of genders. However, if something goes wrong, an error message will be returned, and the error details will be displayed in the terminal.

```js
    app.get("/genders", (req, res) => {
        try {
            res.status(200).send(genders)
        } catch (error) {
            console.log(error);
            res.status(500).send("Não foi possível carregar os gêneros do banco de dados.")
        }
    })
```

**Exercise 4 - Creating a endpoint to delete a gender**

To delete a gender fom the database it was used the id from **req.params**. A variable is used to check if the index used in the request body exist.
If it's a valid id, it's returned a message and the new database updated.

```js
    app.delete("/genders/:id", (req, res) => {
        const { id } = req.params;

        try {
            const index = genders.findIndex(gender => gender.id === id);

            if (index < 0 || index >= genders.length) {
                return res.status(404).send("Gênero não encontrado.");
            } else {
                genders.splice(index, 1)

                return res.status(200).json({
                    message: "Gênero deletado com sucesso!",
                    genders: genders
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Não foi possível deletar este gênero")
        }
    })
```

**Exercise 5 - To modify the endpoint to list the movies, its average duration and the number os total movies**

Created a new list, in addition to the existing genders list, with some new information about each of them.

```json
{
    "movies": [
        {
            "id": 1,
            "title": "How to Train Your Dragon",
            "genre": "Animation",
            "director": "Dean DeBlois",
            "releaseDate": "2010-03-26",
            "language": "English",
            "duration": 98
        },
    ]
}
```

This way, you can calculate the number of movies in the array using the length method, compute the average duration of the movies by summing the total duration of all movies with the reduce method, and then divide this result by the number of movies.

```js
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
            })

        } catch (error) {
            res.status(500).send("Erro ao listar todos os filmes.")
        }
    })
```

### Continuous development


### Useful Resources

- [Thunder Client](https://www.thunderclient.com/) - A lightweight and versatile REST API client extension for Visual Studio Code, enabling developers to effortlessly test and debug APIs with intuitive interface and great features.

## Author

- GitHub - [Felipe Santiago Morais](https://github.com/SantiagoMorais)
- Linkedin - [Felipe Santiago](https://www.linkedin.com/in/felipe-santiago-873025288/)
- Instagram - [@felipe.santiago.morais](https://www.instagram.com/felipe.santiago.morais)
- Email - <a href="mailto:contatofelipesantiago@gmail.com" target="blank">contatofelipesantiago@gmail.com</a>
- <a href="https://api.whatsapp.com/send?phone=5531996951033&text=Hi%2C%20Felipe%21%20I%20got%20your%20contact%20from%20your%20portfolio.">Whatsapp</a>



