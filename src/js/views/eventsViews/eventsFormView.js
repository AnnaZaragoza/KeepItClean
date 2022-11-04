class EventsFormView {
  _parentElement = document.querySelector('.calendar-form');

  _removeBtn = document.querySelector('.calendar-form--remove');

  handlerShowForm() {
    this._parentElement.style.display = 'flex';
  }
  handlerHiddeForm() {
    this._parentElement.style.display = 'none';
  }

  handlerShowRemoveBtn() {
    this._removeBtn.style.display = 'block';
  }

  handlerHiddeRemoveBtn() {
    this._removeBtn.style.display = 'none';
  }
}

export default new EventsFormView();
