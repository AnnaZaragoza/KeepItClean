class ReportsFormView {
  _parentElement = document.querySelector('.reports-form');
  _parentReportsElement = document.querySelector(
    '.reports-form-item--new-issue'
  );
  _reportsItems = document.querySelectorAll('.reports-form-item');
  _data;

  _btnAdd = document.querySelector('.reports-form--input-add-issue');
  _btnRemove = document.querySelector('.reports-form--input-remove-issue');

  contructor() {
    this.handlerAddNewReportField();
    this.handlerRemoveNewReportField();
    this.resetReportsForm();
    this.removeRegeneratedReportsFormItems();
  }

  handlerAddNewReportField() {
    this._btnAdd.addEventListener('click', this._addNewReportField.bind(this));
  }
  handlerRemoveNewReportField() {
    this._btnRemove.addEventListener(
      'click',
      this._removeNewReportField.bind(this)
    );
  }

  _addNewReportField() {
    const report = document.querySelector('.reports-form--input-issue').value;
    const reports = [
      ...document.querySelectorAll('.reports-form--input-issues'),
    ].map(t => t.value);

    if (report === '' || reports.includes('')) {
      alert('Fill all the fields!');
      return;
    }

    const html = `
    <input type="text" placeholder="Introduce report to be performed..." class="reports-form--input-issues" />
    `;

    this._parentReportsElement.insertAdjacentHTML('beforeend', html);

    // this._parentreportsElement.firstElementChild.focus();
  }

  _removeNewReportField() {
    const inputreports = document.querySelectorAll(
      '.reports-form--input-issues'
    );
    // Remove last report
    const listInputreports = [...inputreports];
    const lastreport = listInputreports.pop();
    lastreport.parentNode.removeChild(lastreport);
  }

  resetReportsForm() {
    // Clear input fields
    document.querySelector('.reports-form--input-room').value = '';
    document.querySelector('.reports-form--input-issue').value = '';

    // Remove extra reports
    const reportsInputs = document.querySelectorAll(
      '.reports-form--input-issues'
    );
    reportsInputs.forEach(extraT => {
      extraT.remove();
    });
  }

  renderReport(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <div class="reports-form-item--regenerated">
      <label>Room:</label>
      <input
        type="text"
        placeholder="Introduce the name of the room..."
        class="reports-form--input-room"
        value="${this._data.room}"
      />
    </div>
    <div class="reports-form-item--regenerated">
      <label>Issues:</label>
      <input type="text" placeholder="Introduce report to be performed..." class="reports-form--input-issue"
      value="${this._data.report}" />
    </div>
    <div class="reports-form-item--regenerated">   
      <div class="reports-form-item--new-issue">
        ${this._data.reports
          .map(t => {
            return `<input type="text" placeholder="Introduce report to be performed..." class="reports-form--input-issues" value="${t}" />`;
          })
          .join('')}
      </div>
    </div>
    `;
  }

  removeRegeneratedReportsFormItems() {
    this._reportsItems[0].remove();
    this._reportsItems[1].remove();
    [...document.querySelectorAll('.reports-form-item--regenerated')].forEach(
      i => i.remove()
    );
  }
}

export default new ReportsFormView();
