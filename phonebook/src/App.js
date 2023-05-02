import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMesage] = useState(null);

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const addNewName = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
      id: "",
    };
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number wit the new one?`
        )
      ) {
        const updateContact = persons.filter(
          (person) => person.name === newName
        );
        contactService
          .update(updateContact[0].id, newContact)
          .then((res) => {
            newContact.id = res.id;
            setPersons(
              persons.map((person) =>
                person.name !== newContact.name ? person : newContact
              )
            );
          })
          .catch((error) => {
            setMesage(
              `Information of '${newContact.name}' has already been removed from server`
            );
            setTimeout(() => {
              setMesage(null);
            }, 5000);
          });
      }
    } else {
      contactService.create(newContact).then((res) => {
        newContact.id = res.id;
        setPersons(persons.concat(newContact));
        setMesage(`Added ${newContact.name}`);
        setTimeout(() => {
          setMesage(null);
        }, 5000);
      }).catch((error) => {
        setMesage(error.response.data.error)
        setTimeout(() => {
          setMesage(null);
        }, 5000);
      })
    }
  };

  const removeName = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );
  console.log(filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterName={handleFilterName} filterName={filterName} />
      <h2>Add a new</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} remove={removeName} />
    </div>
  );
};

export default App;
