import { useEffect, useState } from 'react'
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Person from './Components/Person'
import axios from 'axios';



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled');
      setPersons(response.data)
    })
  }, [])
  console.log( 'render ' + persons.length + ' person');

  const filteredPerson = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase()) )

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`) === true) {
        axios
        .delete(`http://localhost:3001/persons/${person.id}`)
        .then(response => {
            alert(`${person.name} deleted`)
            setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
            console.log('failed lololol')
        })
    } else {
        alert('cancel delete')
    }
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicate = persons.some((person) => person.name === newName)
    const findPerson = persons.find(person => person.name === newName)
    const personsObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const updateObject = {
      ...findPerson,
      number: newNumber
    }
    if (!duplicate) {
      axios
      .post('http://localhost:3001/persons', personsObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personsObject));
        setNewName('');
        setNewNumber('');

      })
    }
    else {
      axios
      .put(`http://localhost:3001/persons/${findPerson.id}`, updateObject)
      .then(response => {
        console.log(persons);
        console.log(response.data);
        console.log(persons.map(person => person.id !== findPerson.id ? person : response.data));
        setPersons(persons.map(person => person.id !== findPerson.id ? person : response.data))
      })
    }
  }

  const handleSearchChange = event =>
    setSearchName(event.target.value)

  const handleNameChange = event => 
    setNewName(event.target.value);

  const handleNumberChange = event => 
    setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter type="text" onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Person filteredPerson={filteredPerson} deletePerson={deletePerson}/>
    </div>
  )
}

export default App