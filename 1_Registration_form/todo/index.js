// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        taskInput.value = ''; // clear the input
        updateLocalStorage();
        renderTasks();
    }
});

// Edit task
function editTask(index) {
    const newTask = prompt('Edit task:', tasks[index]);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask.trim();
        updateLocalStorage();
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    }
}

// Update LocalStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial rendering of tasks
renderTasks();
