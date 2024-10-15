function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todo-list');
            todoList.innerHTML = '';
            data.forEach(task => {
                addTodoItem(task);
            });
        });
}

function addTodoItem(task) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerText = task;

    const completeBtn = document.createElement('button');
    completeBtn.innerText = 'Complete';
    completeBtn.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', function() {
        deleteTask(task);
        li.remove();
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    document.getElementById('todo-list').appendChild(li);
}

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;
    if (todoText) {
        saveTask(todoText);
        todoInput.value = '';
    }
});

function saveTask(task) {
    fetch('/add-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
    .then(() => {
        fetchTasks();
    });
}
    
function deleteTask(task) {
    fetch('/delete-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    });
}

window.onload = fetchTasks;
