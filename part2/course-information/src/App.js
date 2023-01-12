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

const Course = ({course}) => {
  return(
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
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
    <h3>total of {total} exercises</h3>
  )
}

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  

  return(
    <div>
      <Course course={course[0]}/>
      <Course course={course[1]}/>
    </div>
  )
}

export default App;