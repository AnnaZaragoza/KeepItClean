class SectionTasksView {
  _parentElement = document.querySelector('.sub-sections');

  _section = document.querySelector('.sub-section--2');
  _btnOpen = document.querySelector('.nav-tasks');
  _btnClose = document.querySelector('.nav-reports');

  constructor() {
    this.handlerShowSection();
    this.handlerHiddeSection();
  }

  showSection() {
    this._section.classList.remove('hidden');
  }
  hiddeSection() {
    this._section.classList.add('hidden');
  }

  handlerShowSection() {
    this._btnOpen.addEventListener(
      'click',
      this.showSection.bind(this),
      this.handlerUploadTasksFromLocalStorage.bind(this)
    );
  }
  handlerHiddeSection() {
    this._btnClose.addEventListener('click', this.hiddeSection.bind(this));
  }

  handlerUploadTasksFromLocalStorage(handler) {
    const data = JSON.parse(localStorage.getItem('tasksList'));

    if (!data) return;

    handler(data);
  }
}

export default new SectionTasksView();
