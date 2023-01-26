import { useEffect, useState } from 'react'
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Person from './Components/Person'
import personService from './services/phone'

const Notification = ({message}) => {
  if (message == null) {
    return null
  }

  const notificationStyle = {
    color: message[0] === 0 ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return(
    <div className='error' style={notificationStyle}>
      {message[1]}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const errorNull = () => setTimeout(() => {
    setErrorMessage(null)
  }, 3000)

  useEffect(() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const filteredPerson = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase()) )

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`) === true) {
        personService.deletePerson(person.id)
        .then(response => {
            alert(`${person.name} deleted`)
            setPersons(persons.filter(p => p.id !== person.id))
            setErrorMessage([0 ,`${person.name}'s phonebook deleted`])
            errorNull()
        })
        .catch(error => {
          setErrorMessage([1, `${person.name}'s phonebook is already deleted`])
          errorNull()
        })
    } else {
        alert('cancel delete')
    }
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicate = persons.some(person => person.name === newName)
    const findPerson = persons.find(person => person.name === newName)
    const personsObject = {
      name: newName,
      number: newNumber
    }
    const updateObject = {
      ...findPerson,
      number: newNumber
    }
    if (!duplicate) {
      personService.createPerson(personsObject)
      .then(response => {
        const personObjectId = {
          name: newName,
          number: newNumber,
          id: response.data.id
        }
        setPersons(persons.concat(personObjectId));
        setErrorMessage([0, `Added ${newName}`])
        errorNull()
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log(error.response.data.error);
        setErrorMessage([1, `${error.response.data.error}`])
        errorNull()
      })
    }
    else {
      personService.updatePerson(findPerson.id, updateObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== findPerson.id ? person : response.data));
      })
      .then(e => {
        setErrorMessage([0, `Updated ${newName}`])
        errorNull()
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        setErrorMessage([1, `${error.response.data.error}`])
        errorNull()
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
      <Notification message={errorMessage} />
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