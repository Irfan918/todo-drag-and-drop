import { useState, useEffect } from 'react'
import initTodos from './todos'
import TodoList from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')


  const toggleTodo = id => {
    const idx = todos.findIndex(todo => todo._id === id)
    const newTodos = [...todos]

    newTodos[idx].completed = !newTodos[idx].completed
    setTodos(newTodos)
  }

  const removeTodo = id => {
    const idx = todos.findIndex(todo => todo._id === id)
    const newTodos = [...todos]

    if (idx !== -1) {
      newTodos.splice(idx, 1)
    }

    setTodos(newTodos)
  }

  const addTodo = e => {
    if (e.keyCode === 13) {
      if (task.trim() !== '') {
        const newTodo = {
          _id: Date.now(),
          task: task.trim(),
          completed: false,
        }
        setTodos([...todos, newTodo])
      }
      setTask('')
    }
  }

  const handleOnDragEnd = result => {
    if (!result.destination) return

    const items = [...todos]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTodos(items)
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    setTodos(storedTodos !== null ? JSON.parse(storedTodos) : initTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className='container'>
      <div className='header-image'></div>
      <main>
        <div className='app-title'>
          <h1>TODO</h1>          
        </div>
        <div className='input-todo'>
          <div>
            <div className='outer-circle'>
              <div className='circle'></div>
            </div>
          </div>
          <input
            type='text'
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={addTodo}
            title='Create a new todo'
            placeholder='Create a new todo...'
          />
        </div>
        <div className='wrapper'>
          <TodoList           
            todos={todos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            handleOnDragEnd={handleOnDragEnd}
          />
          <footer>
            <div className='left'>
              <small>
                {todos.filter(item => !item.completed).length} items left
              </small>
            </div>            
            <div className='right'>
              <button
                onClick={() => setTodos(todos.filter(item => !item.completed))}
              >
                Clear Completed
              </button>
            </div>
          </footer>
        </div>        
        <div className='message'>
          <small>Drag and drop to reorder list</small>
        </div>
      </main>
    </div>
  )
}

export default App
