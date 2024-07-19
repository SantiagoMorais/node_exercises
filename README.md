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

![Thunder client window](/src/assets/exercise-1/thunder-client.png)

**Exercise 2 - Creating a new endpoint to add new genders**

The logical to check if the 'description' and 'name' are valid is already done. It's used the same of the **put** endpoint. So, it was just necessary to create de endpoint **post** to add it into the array 'genders'.

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


### Continuous development


### Useful Resources

- [Thunder Client](https://www.thunderclient.com/) - A lightweight and versatile REST API client extension for Visual Studio Code, enabling developers to effortlessly test and debug APIs with intuitive interface and great features.

## Author

- GitHub - [Felipe Santiago Morais](https://github.com/SantiagoMorais)
- Linkedin - [Felipe Santiago](https://www.linkedin.com/in/felipe-santiago-873025288/)
- Instagram - [@felipe.santiago.morais](https://www.instagram.com/felipe.santiago.morais)
- Email - <a href="mailto:contatofelipesantiago@gmail.com" target="blank">contatofelipesantiago@gmail.com</a>
- <a href="https://api.whatsapp.com/send?phone=5531996951033&text=Hi%2C%20Felipe%21%20I%20got%20your%20contact%20from%20your%20portfolio.">Whatsapp</a>



