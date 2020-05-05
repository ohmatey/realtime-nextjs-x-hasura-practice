import React from 'react'
import { useSubscription } from '@apollo/react-hooks'

import useTodos from '../modules/todos/hooks/useTodos'

const TodoList = () => {
  const { data, loading, error } = useTodos()

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
