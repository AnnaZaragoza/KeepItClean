class TaskView {
  _parentElement = document.querySelector('.tasks-list');
  _data;

  _btnAdd = document.querySelector('.task--edit-btn');
  _btnRemove = document.querySelector('.task--dlt-btn');

  contructor() {
    this.handlerAddNewTaskField();
    this.handlerRemoveNewTaskField();
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _generateMarkup() {
    return `
      <div class="tasks">
        <div class="task" data-id="${this._data.id}">
          <div class="task-title">
            <h3>${this._data.room}</h3>
            <div class="task--buttons">
            <button type="button" class="task--edit-btn">Edit</button>
              <button type="button" class="task--dlt-btn">Delete</button>
            </div>
          </div>
          <div class="task-content">
            <p>${this._data.task}</p>
            ${this._data.tasks
              .map(t => {
                return `<p>${t}</p>`;
              })
              .join('')}
          </div>
        </div>
        `;
  }

  handlerClearTask(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clicked = e.target.closest('.task--dlt-btn');
      const task = e.target.closest('.task');
      const taskId = task.getAttribute('data-id');

      if (!clicked) return;

      task.classList.add('hidden');

      handler(taskId);
    });
  }

  handlerEditTask(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clicked = e.target.closest('.task--edit-btn');
      const task = e.target.closest('.task');
      const taskId = task.getAttribute('data-id');

      if (!clicked) return;

      task.classList.add('hidden');

      handler(taskId);
    });
  }
}

export default new TaskView();
