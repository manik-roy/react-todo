import React, { useState, useEffect } from 'react';
import './App.css';
import TodoItem from './Components/todoItem/TodoItem';


function App() {

  const [newTodo, setNewTodo] = useState('')

  const [todos, setTodos] = useState([]);

  const [filterItem, setFilterItem] = useState([]);

  const [category, setCategory] = useState('all');

  useEffect(() => {
    const items = localStorage.getItem('todos');
    items && setTodos(JSON.parse(items));
  }, [])

  // add new todo
  const addTodo = () => {
    const createTodo = {
      name: newTodo,
      isActive: true,
      id: new Date().getTime() + Math.random(),
    }
    const newTodos = [...todos, createTodo];
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setNewTodo('');
  }

  // remove todos
  const removeTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id)
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  // done todo
  const doneTodo = id => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isActive = !todo.isActive;
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos)
  }

  // filter todo with category 

  useEffect(() => {
    if (category === 'all') {
      return setFilterItem([...todos])
    }
    if (category === 'done') {
      const currentItems = todos.filter(item => item.isActive !== true)
      return setFilterItem([...currentItems])
    }
    if (category === 'active') {
      const currentItems = todos.filter(item => item.isActive === true)
      return setFilterItem([...currentItems])
    }
    console.log(todos);
  }, [category, todos])

  return (
    <div className="col-md-4 mx-auto px-2">
      <div className="todo justify-content-center mt-5">
        <div class="input-group mb-2 mr-sm-2">
          <input type="text" name="todo" value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)} className="form-control" />
          <div class="input-group-append">
            <button className="btn btn-secondary" onClick={addTodo}>Add todo</button>
          </div>
        </div>
      </div>
      <div className="buttons-group col text-center">
        <button
          onClick={() => setCategory('all')}
          className="btn btn-md btn-dark mr-2"> ALL
        </button>
        <button
          onClick={() => setCategory('active')}
          className="btn btn-md btn-success mr-2"> Active
        </button>
        <button
          onClick={() => setCategory('done')}
          className="btn btn-md btn-info mr-2">Done
        </button>
        <button
          className="btn btn-md btn-danger  ">Clear
        </button>

      </div>
      <div className="todo-container mt-4">
        {filterItem.length === 0 ? <p className="text-center text-success"> there is no todo item </p> :
          <ul className="list-group">
            {filterItem.map(todo => <TodoItem todo={todo} removeTodo={removeTodo} doneTodo={doneTodo} />)}
          </ul>}
      </div>
    </div >
  );
}

export default App;