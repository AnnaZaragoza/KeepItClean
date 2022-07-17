class sectionReportsView {
  _parentElement = document.querySelector('.sub-sections');

  _section = document.querySelector('.sub-section--3');
  _btnOpen = document.querySelector('.nav-reports');
  _btnClose = document.querySelector('.nav-tasks');

  constructor() {
    this.handlerShowSection();
    this.handlerHiddeSection();
  }

  removeSection() {
    this._section.classList.remove('hidden');
  }
  hiddeSection() {
    this._section.classList.add('hidden');
  }

  handlerShowSection() {
    this._btnOpen.addEventListener('click', this.removeSection.bind(this));
  }
  handlerHiddeSection() {
    this._btnClose.addEventListener('click', this.hiddeSection.bind(this));
  }
}

export default new sectionReportsView();
