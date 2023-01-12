const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return(
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = ({course}) => {
  return(
    <>
      {course.parts.map(coourse => <Part key={coourse.id} part={coourse.name} exercises={coourse.exercises} />)}
    </>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((sum, exercises) => sum + exercises.exercises, 0)
  return(
    <h2>total of {total} exercises</h2>
  )
}

const Course = ({course}) => {
    return(
      <>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </>
    )
  }

export default Course;