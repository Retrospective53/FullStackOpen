const Person = ({filteredPerson, key}) => {
    return(
        <>{filteredPerson.map((person) => <p key={person.id}>{person.name} {person.number}</p>)}</>
    )
}

export default Person;