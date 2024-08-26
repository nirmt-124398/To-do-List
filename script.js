document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const taskItem = createTaskElement(taskText);

        taskList.appendChild(taskItem);
        saveTask(taskText);

        taskInput.value = '';
    }
}

function createTaskElement(taskText, completed = false) {
    const taskItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
        taskContent.classList.toggle('completed');
        updateTaskCompletion(taskText, checkbox.checked);
    });

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    if (completed) {
        taskContent.classList.add('completed');
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function() {
        const newTaskText = prompt('Edit Task', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskContent.textContent = newTaskText;
            updateTask(taskText, newTaskText);
            taskText = newTaskText;
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
        removeTask(taskText);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    return taskItem;
}

function saveTask(taskText, completed = false) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}

function updateTask(oldTaskText, newTaskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === oldTaskText);
    if (taskIndex > -1) {
        tasks[taskIndex].text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function updateTaskCompletion(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
