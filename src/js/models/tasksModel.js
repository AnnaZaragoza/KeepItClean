export let TASKS_LIST = [];

export const state = {
  task: {},
};

export const uploadTask = function (newTask, id) {
  // Create a task object:
  const task = {
    id,
    room: newTask[0],
    task: newTask[1],
    tasks: newTask[2],
  };
  // Define state task
  state.task = {
    id: task.id,
    room: task.room,
    task: task.task,
    tasks: task.tasks,
  };
};

export const setTasksToLocalStorage = function () {
  localStorage.setItem('tasksList', JSON.stringify(TASKS_LIST));
};

export const uploadTasksFromLocalStorage = function (tasksList) {
  TASKS_LIST = tasksList;
};

export const removeTaskFromLocalStorage = function (taskId) {
  TASKS_LIST = JSON.parse(localStorage.getItem('tasksList'));

  if (!TASKS_LIST) return;

  const index = TASKS_LIST.findIndex(el => el.id === taskId);
  TASKS_LIST.splice(index, 1);

  localStorage.setItem('tasksList', JSON.stringify(TASKS_LIST));
};

export const findTaskToEditFromLocalStorage = function (taskId) {
  const data = JSON.parse(localStorage.getItem('tasksList'));

  // Find task to be edited
  const taskToEdit = data.find(el => el.id === taskId);
  state.task = taskToEdit;
};
