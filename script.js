document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('search').addEventListener('input', displayTasks);
document.getElementById('filter-category').addEventListener('change', displayTasks);

function addTask(e) {
    e.preventDefault();
    
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;
    const category = document.getElementById('task-category').value;

    const task = {
        title,
        desc,
        date,
        category,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    displayTasks();
    document.getElementById('task-form').reset();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksContainer = document.getElementById('tasks');
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filterCategory = document.getElementById('filter-category').value;

    tasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        if ((filterCategory === 'all' || task.category === filterCategory) &&
            (task.title.toLowerCase().includes(searchQuery) || task.desc.toLowerCase().includes(searchQuery))) {

            const taskEl = document.createElement('div');
            taskEl.classList.add('task');
            taskEl.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <small>${task.date}</small>
                <small>${task.category}</small>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Unmark' : 'Mark'} as Completed</button>
                <button onclick="editTask(${index})">Edit</button>
            `;
            tasksContainer.appendChild(taskEl);
        }
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    document.getElementById('task-title').value = task.title;
    document.getElementById('task-desc').value = task.desc;
    document.getElementById('task-date').value = task.date;
    document.getElementById('task-category').value = task.category;

    deleteTask(index);
}

function filterTasks() {
    displayTasks();
}

document.addEventListener('DOMContentLoaded', displayTasks);
