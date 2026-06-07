const STORAGE_KEY = 'todos';

let todos = load();
let currentFilter = 'all';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const remainingCount = document.getElementById('remaining-count');
const clearBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, completed: false });
  save();
  render();
  input.value = '';
});

clearBtn.addEventListener('click', () => {
  todos = todos.filter((t) => !t.completed);
  save();
  render();
});

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

function toggle(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  save();
  render();
}

function remove(id) {
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

function filtered() {
  if (currentFilter === 'active') return todos.filter((t) => !t.completed);
  if (currentFilter === 'completed') return todos.filter((t) => t.completed);
  return todos;
}

function render() {
  const items = filtered();
  list.innerHTML = '';

  if (items.length === 0) {
    const msg = document.createElement('li');
    msg.className = 'empty-message';
    msg.textContent = 'タスクがありません';
    list.appendChild(msg);
  } else {
    items.forEach((todo) => {
      const li = document.createElement('li');
      if (todo.completed) li.classList.add('completed');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo-checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => toggle(todo.id));

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.textContent = '✕';
      del.setAttribute('aria-label', '削除');
      del.addEventListener('click', () => remove(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  const activeCount = todos.filter((t) => !t.completed).length;
  remainingCount.textContent = `${activeCount}件の未完了タスク`;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

render();
