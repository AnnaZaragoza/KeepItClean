class ReportsView {
  _parentElement = document.querySelector('.reports-form');

  handlerUploadReport(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const room = document.querySelector('.reports-form--input-room').value;
      const report = document.querySelector('.reports-form--input-issue').value;

      const reports = [
        ...document.querySelectorAll('.reports-form--input-issues'),
      ].map(t => t.value);

      const data = [room, report, reports];

      // Check for empty fields
      const dataValues = [room, report, ...reports];
      const oneEmptyField = dataValues.some(v => v === '');

      // Handle data
      if (oneEmptyField) alert('Please, fill up the fields!');
      else handler(data);
    });
  }

  handlerUploadReports(handler) {
    const data = JSON.parse(localStorage.getItem('reportsList'));

    if (!data) return;

    handler(data);
  }
}

export default new ReportsView();
