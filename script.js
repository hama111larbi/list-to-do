document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskListClick);

    loadTasksFromLocalStorage();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);
            saveTasksToLocalStorage();
            taskInput.value = '';
        }
    }

    function handleTaskListClick(event) {
        const target = event.target;
        const taskItem = target.closest('.taskItem');

        if (target.classList.contains('editTaskButton')) {
            editTask(taskItem);
        } else if (target.classList.contains('deleteTaskButton')) {
            deleteTask(taskItem);
        }
    }

    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.className = 'taskItem';
        li.innerHTML = `
            <span class="taskText">${taskText}</span>
            <button class="editTaskButton">Edit</button>
            <button class="deleteTaskButton">Delete</button>
        `;
        return li;
    }

    function editTask(taskItem) {
        const taskTextSpan = taskItem.querySelector('.taskText');
        const newTaskText = prompt('Edit Task:', taskTextSpan.textContent);
        if (newTaskText !== null) {
            taskTextSpan.textContent = newTaskText.trim();
            saveTasksToLocalStorage();
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('.taskText').forEach(taskTextSpan => {
            tasks.push(taskTextSpan.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);
        });
    }
});
