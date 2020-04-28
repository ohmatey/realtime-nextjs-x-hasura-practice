import Head from 'next/head'

import TodoList from '../components/TodoList'
import TodoInput from '../components/TodoInput'

const Home = () => (
  <>
    <div>
      <h1>My todo list</h1>
    </div>

    <div>
      <TodoInput />

      <TodoList />
    </div>

    <div>
      <h2>Another section</h2>
    </div>
  </>
)

export default Home
