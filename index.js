const express = require("express");
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static('buil'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  let numberOfContacts = persons.length;
  let now = new Date("2023-04-15");
  console.log(now);
  response.send(`<p>Phonebook has info for ${numberOfContacts} poeple</p>
    <p>${now}</p`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

morgan.token('data', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const id = Math.floor(Math.random() * 10000) + 5;

  const newPerson = {
    id: id,
    name: person.name,
    number: person.number,
  };

  const repeatName = persons.find((person) => person.name === newPerson.name);

  if (!newPerson.name || !newPerson.number) {
    response.status(400).json({
      error: "name and number must not be empty",
    });
  }

  if (repeatName) {
    response.status(400).json({
      error: "name must be unique",
    });
  } else {
    persons.concat(newPerson);
    response.json(newPerson);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Sever runing on pot ${PORT}`);
});
