import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/todos';

export default function TodoForm({ editTodo, onSave }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editTodo) setTitle(editTodo.title);
    else setTitle('');
  }, [editTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      if (editTodo) {
        await axios.put(`${API}/${editTodo.id}`, { title });
      } else {
        await axios.post(API, { title });
      }
      onSave();
      setTitle('');
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter a task..."
        required
        style={{
          flex: 1, padding: '10px 14px',
          borderRadius: 8, border: '1px solid #ddd',
          fontSize: 15
        }}
      />
      <button type="submit" style={{
        padding: '10px 20px', borderRadius: 8,
        background: editTodo ? '#f0a500' : '#4CAF50',
        color: '#fff', border: 'none',
        fontSize: 15, cursor: 'pointer', fontWeight: 600
      }}>
        {editTodo ? '✏️ Update' : '➕ Add'}
      </button>
      {editTodo && (
        <button type="button" onClick={() => onSave()} style={{
          padding: '10px 16px', borderRadius: 8,
          background: '#aaa', color: '#fff',
          border: 'none', cursor: 'pointer'
        }}>
          Cancel
        </button>
      )}
    </form>
  );
}