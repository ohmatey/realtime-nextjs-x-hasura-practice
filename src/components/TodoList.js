import React from 'react'
import { useSubscription } from '@apollo/react-hooks'

import { GET_TODOS } from '../modules/todos/actions'

const TodoList = () => {
  const { data, loading, error } = useSubscription(GET_TODOS)

  if (error) {
    console.log(error)

    return 'Error occurred'
  }

  if (loading) {
    return 'loading'
  }

  return (
    <ul>
      {data.todos.map(todo => (
        <li key={todo.id}>
          <h2>{todo.name}</h2>
          {todo.todo_type && (
            <h5>{todo.todo_type.name}</h5>
          )}
          <time>{todo.created_at}</time>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
