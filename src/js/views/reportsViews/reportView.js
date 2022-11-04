class ReportView {
  _parentElement = document.querySelector('.reports-list');
  _data;

  _btnAdd = document.querySelector('.report--edit-btn');
  _btnRemove = document.querySelector('.report--dlt-btn');

  contructor() {
    this.handlerAddNewReportField();
    this.handlerRemoveNewReportField();
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _generateMarkup() {
    return `
        <div class="report" data-id="${this._data.id}">
          <div class="report-title">
            <h3>${this._data.room}</h3>
            <div class="report--buttons">
            <button type="button" class="report--edit-btn">Edit</button>
              <button type="button" class="report--dlt-btn">Delete</button>
            </div>
          </div>
          <div class="report-content">
            <p>${this._data.report}</p>
            ${this._data.reports
              .map(t => {
                return `<p>${t}</p>`;
              })
              .join('')}
          </div>
        </div>
        `;
  }

  handlerClearReport(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clicked = e.target.closest('.report--dlt-btn');
      const report = e.target.closest('.report');
      const reportId = report.getAttribute('data-id');

      if (!clicked) return;

      report.classList.add('hidden');

      handler(reportId);
    });
  }

  handlerEditReport(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clicked = e.target.closest('.report--edit-btn');
      const report = e.target.closest('.report');
      const reportId = report.getAttribute('data-id');

      if (!clicked) return;

      report.classList.add('hidden');

      handler(reportId);
    });
  }
}

export default new ReportView();
