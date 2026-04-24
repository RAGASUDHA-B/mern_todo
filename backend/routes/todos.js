const router  = require('express').Router();
const fs      = require('fs');
const path    = require('path');
const FILE = path.join(__dirname, '../data/todos.json');
const readTodos  = () => JSON.parse(fs.readFileSync(FILE, 'utf-8'));
const writeTodos = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
router.get('/', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});
router.post('/', (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id:        Date.now().toString(),
    title:     req.body.title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});
router.put('/:id', (req, res) => {
  const todos    = readTodos();
  const index    = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos[index]   = { ...todos[index], ...req.body };
  writeTodos(todos);
  res.json(todos[index]);
});
router.patch('/:id/toggle', (req, res) => {
  const todos  = readTodos();
  const index  = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos[index].completed = !todos[index].completed;
  writeTodos(todos);
  res.json(todos[index]);
});
router.delete('/:id', (req, res) => {
  const todos     = readTodos();
  const filtered  = todos.filter(t => t.id !== req.params.id);
  writeTodos(filtered);
  res.json({ message: 'Todo deleted' });
});
module.exports = router;