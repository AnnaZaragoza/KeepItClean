class TasksView {
  _parentElement = document.querySelector('.tasks-form');

  handlerUploadTask(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const room = document.querySelector('.tasks-form--input-room').value;
      const task = document.querySelector('.tasks-form--input-task').value;

      const tasks = [
        ...document.querySelectorAll('.tasks-form--input-tasks'),
      ].map(t => t.value);

      const data = [room, task, tasks];

      // Check for empty fields
      const dataValues = [room, task, ...tasks];
      const oneEmptyField = dataValues.some(v => v === '');

      // Handle data
      if (oneEmptyField) alert('Please, fill up the fields!');
      else handler(data);
    });
  }

  handlerUploadTasks(handler) {
    const data = JSON.parse(localStorage.getItem('tasksList'));

    if (!data) return;

    handler(data);
  }
}

export default new TasksView();
