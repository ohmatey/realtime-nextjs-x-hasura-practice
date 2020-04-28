import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'

import { ADD_TODO } from '../modules/todos/actions'

const TodoInput = () => {
  const [todoText, setTodoText] = useState()
  const [addTodo] = useMutation(ADD_TODO)

  const handleInputChange = e => setTodoText(e.currentTarget.value)

  const handleAddTodo = async () => {
    try {
      const resp = await addTodo({
        variables: {
          name: todoText
        }
      })
      
      console.log('resp', resp)

      setTodoText('')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <input type='text' onChange={handleInputChange} value={todoText} />

      <button onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default TodoInput
