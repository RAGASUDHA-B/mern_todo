import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos]       = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const completed = todos.filter(t => t.completed).length;

  return (
    <div style={{
      maxWidth: 600, margin: '40px auto',
      padding: '0 20px', fontFamily: 'sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ margin: 0, color: '#333' }}>📝 Todo App</h1>
        <p style={{ color: '#888', marginTop: 6 }}>
          {completed}/{todos.length} tasks completed
        </p>
      </div>

      {/* Form */}
      <TodoForm
        editTodo={editTodo}
        onSave={() => { setEditTodo(null); fetchTodos(); }}
      />

      {/* List */}
      <TodoList
        todos={todos}
        onEdit={setEditTodo}
        onRefresh={fetchTodos}
      />
    </div>
  );
}

export default App;