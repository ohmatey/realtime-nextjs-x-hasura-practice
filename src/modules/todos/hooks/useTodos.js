import React, { useContext } from 'react'
import { useSubscription } from '@apollo/react-hooks'

import { GET_TODOS } from '../actions'

export const TodosContext = React.createContext({
  todos: [],
  loading: false,
  error: null
})

export const TodosProvider = ({
  children
}) => {
  const { data = {}, loading, error } = useSubscription(GET_TODOS)

  const {
    todos = []
  } = data

  return (
    <TodosContext.Provider value={{ todos, error, loading }}>
      {children}
    </TodosContext.Provider>
  )
}

const useTodos = () => {
  const user = useContext(TodosContext)

  return user
}

export default useTodos
