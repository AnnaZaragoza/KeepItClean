class TasksFormView {
  _parentElement = document.querySelector('.tasks-form');
  _parentTasksElement = document.querySelector('.tasks-form-item--new-task');
  _tasksItems = document.querySelectorAll('.tasks-form-item');
  _data;

  _btnAdd = document.querySelector('.tasks-form--input-add-task');
  _btnRemove = document.querySelector('.tasks-form--input-remove-task');

  contructor() {
    this.handlerAddNewTaskField();
    this.handlerRemoveNewTaskField();
    this.resetTasksForm();
    this.removeRegeneratedFormItems();
  }

  handlerAddNewTaskField() {
    this._btnAdd.addEventListener('click', this._addNewTaskField.bind(this));
  }
  handlerRemoveNewTaskField() {
    this._btnRemove.addEventListener(
      'click',
      this._removeNewTaskField.bind(this)
    );
  }

  _addNewTaskField() {
    const task = document.querySelector('.tasks-form--input-task').value;
    const tasks = [
      ...document.querySelectorAll('.tasks-form--input-tasks'),
    ].map(t => t.value);

    if (task === '' || tasks.includes('')) {
      alert('Fill all the fields!');
      return;
    }

    const html = `
    <input type="text" placeholder="Introduce task to be performed..." class="tasks-form--input-tasks" />
    `;

    this._parentTasksElement.insertAdjacentHTML('beforeend', html);

    // this._parentTasksElement.firstElementChild.focus();
  }

  _removeNewTaskField() {
    const inputTasks = document.querySelectorAll('.tasks-form--input-tasks');
    // Remove last task
    const listInputTasks = [...inputTasks];
    const lastTask = listInputTasks.pop();
    lastTask.parentNode.removeChild(lastTask);
  }

  resetTasksForm() {
    // Clear input fields
    document.querySelector('.tasks-form--input-room').value = '';
    document.querySelector('.tasks-form--input-task').value = '';

    // Remove extra tasks
    const tasksInputs = document.querySelectorAll('.tasks-form--input-tasks');
    tasksInputs.forEach(extraT => {
      extraT.remove();
    });
  }

  renderTask(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <div class="tasks-form-item--regenerated">
      <label>Room:</label>
      <input
        type="text"
        placeholder="Introduce the name of the room..."
        class="tasks-form--input-room"
        value="${this._data.room}"
      />
    </div>
    <div class="tasks-form-item--regenerated">
      <label>Tasks:</label>
      <input type="text" placeholder="Introduce task to be performed..." class="tasks-form--input-task"
      value="${this._data.task}" />
    </div>
    <div class="tasks-form-item--regenerated">   
      <div class="tasks-form-item--new-task">
        ${this._data.tasks
          .map(t => {
            return `<input type="text" placeholder="Introduce task to be performed..." class="tasks-form--input-tasks" value="${t}" />`;
          })
          .join('')}
      </div>
    </div>
    `;
  }

  removeRegeneratedFormItems() {
    this._tasksItems[0].remove();
    this._tasksItems[1].remove();
    [...document.querySelectorAll('.tasks-form-item--regenerated')].forEach(i =>
      i.remove()
    );
  }
}

export default new TasksFormView();
