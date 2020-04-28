import gql from 'graphql-tag'

export const GET_TODOS = gql`
  subscription todos {
    todos {
      id
      name
      created_at
      todo_type {
        id
        name
      }
    }
  }
`

export const ADD_TODO = gql`
  mutation addTodo (
    $name: String
  ) {
    insert_todos(
      objects: {
        name: $name
      }
    ) {
      affected_rows
      returning {
        created_at
        id
        name
      }
    }
  }
`
