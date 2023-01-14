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
    person.name.toLowerCase().includes(searchName.toLocaleLowerCase()) )

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicate = persons.some((person) => person.name === newName)
    const personsObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (!duplicate) {
      setPersons(persons.concat(personsObject));
      setNewName('');
      setNewNumber('');
    }
    else {
      alert(`${newName} is already added to phonebook`)
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
      <Person filteredPerson={filteredPerson}/>
    </div>
  )
}

export default App