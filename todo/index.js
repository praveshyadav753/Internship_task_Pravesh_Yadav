// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingIndex = null; // Track the index of the task being edited

// Render tasks on page load
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div class="mange">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Add new task or save edit
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        if (editingIndex !== null) {
            // Save edited task
            tasks[editingIndex] = task;
            editingIndex = null;
            addTaskBtn.textContent = 'Add Task'; // Reset button text
        } else {
            // Add new task
            tasks.push(task);
        }
        taskInput.value = ''; // Clear input field
        updateLocalStorage();
        renderTasks();
    }
});

// Edit task
function editTask(index) {
    taskInput.value = tasks[index]; // Set input value to the task text
    editingIndex = index; // Set the editing index
    addTaskBtn.textContent = 'Save Task'; // Change button text
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
