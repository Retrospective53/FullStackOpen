import { useState } from 'react'
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Person from './Components/Person'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Remilia', number: '050-1234567', id: 2 },
    { name: 'Sakuya', number: '040-1124567', id: 3 },
    { name: 'Patchouli', number: '060-1234567', id: 4 },
    { name: 'Reimu', number: '020-114567', id: 5 },


  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [searchName, setSearchName] = useState('')

  const filteredPerson = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLocaleLowerCase()) )

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicate = persons.some((person) => person.name === newName)
    const personsObject = {
      name: newName,
      number: newNumber
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