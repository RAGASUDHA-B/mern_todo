import axios from 'axios';

const API = 'http://localhost:5000/api/todos';

export default function TodoList({ todos, onEdit, onRefresh }) {

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await axios.delete(`${API}/${id}`);
    onRefresh();
  };

  const handleToggle = async (id) => {
    await axios.patch(`${API}/${id}/toggle`);
    onRefresh();
  };

  if (todos.length === 0)
    return <p style={{ color: '#999', textAlign: 'center' }}>No tasks yet. Add one above! 👆</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map(todo => (
        <li key={todo.id} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', marginBottom: 8,
          background: todo.completed ? '#f0fff0' : '#fff',
          borderRadius: 8, border: '1px solid #eee',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          {/* Toggle checkbox */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />

          {/* Title */}
          <span style={{
            flex: 1, fontSize: 15,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#aaa' : '#333'
          }}>
            {todo.title}
          </span>

          {/* Edit button */}
          <button onClick={() => onEdit(todo)} style={{
            background: '#2196F3', color: '#fff',
            border: 'none', padding: '5px 12px',
            borderRadius: 6, cursor: 'pointer'
          }}>Edit</button>

          {/* Delete button */}
          <button onClick={() => handleDelete(todo.id)} style={{
            background: '#e53935', color: '#fff',
            border: 'none', padding: '5px 12px',
            borderRadius: 6, cursor: 'pointer'
          }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}