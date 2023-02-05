import { useDispatch } from "react-redux"
import { createFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const filterChange = e => {
    dispatch(createFilter(e.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={filterChange} />
    </div>
  )
}

export default Filter