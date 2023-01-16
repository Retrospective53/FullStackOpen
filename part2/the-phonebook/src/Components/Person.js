
const Person = ({filteredPerson, deletePerson}) => {
    return(
        <>{filteredPerson.map((person) => 
            <p key={person.id}>{person.name} {person.number}
                <button type="button" onClick={() => deletePerson(person)}>delete
                </button>
            </p>)}
        </>
    )
}

export default Person;