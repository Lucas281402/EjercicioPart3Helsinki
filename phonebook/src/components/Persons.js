const Persons = ({ filteredPersons, remove }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => remove(person.id, person.name)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
