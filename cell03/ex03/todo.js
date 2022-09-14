function addTodo() {
  const input = prompt('Enter new TODO');
  if (!input) return;

  lists.unshift(input);
  setCookie('lists', JSON.stringify(lists));

  const todo = createElement(input);
  prependElement(todo);
}

function createElement(text) {
  const todo = document.createElement('div');

  const textElement = document.createTextNode(text);
  todo.appendChild(textElement);

  const delBtn = createDelBtn(text);
  todo.appendChild(delBtn);

  return todo;
}

function createDelBtn(text) {
  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'delete';
  delBtn.onclick = () => {
    const isDelete = confirm('delete');
    if (!isDelete) return;

    const index = lists.indexOf(text);

    lists.splice(index, 1);
    setCookie('lists', JSON.stringify(lists));
    renderTodos();
  };

  return delBtn;
}

function appendElement(todo) {
  const todos = document.getElementById('ft_list');
  todos.append(todo);
}

function prependElement(todo) {
  const todos = document.getElementById('ft_list');
  todos.prepend(todo);
}

function removeAll() {
  const todos = document.getElementById('ft_list');
  while (todos.lastElementChild) {
    todos.removeChild(todos.lastElementChild);
  }
}

function renderTodos() {
  removeAll();

  lists.map((text) => {
    const todo = createElement(text);
    appendElement(todo);
  });
}

const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    '; path=' +
    path;
};

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

let lists = JSON.parse(getCookie('lists'));

renderTodos();
