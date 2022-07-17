export let REPORTS_LIST = [];

export const state = {
  report: {},
};

export const uploadReport = function (newreport, id) {
  // Create a report object:
  const report = {
    id,
    room: newreport[0],
    report: newreport[1],
    reports: newreport[2],
  };
  // Define state report
  state.report = {
    id: report.id,
    room: report.room,
    report: report.report,
    reports: report.reports,
  };
};

export const setReportsToLocalStorage = function () {
  localStorage.setItem('reportsList', JSON.stringify(REPORTS_LIST));
};

export const uploadReportsFromLocalStorage = function (reportsList) {
  REPORTS_LIST = reportsList;
};

export const removeReportFromLocalStorage = function (reportId) {
  REPORTS_LIST = JSON.parse(localStorage.getItem('reportsList'));

  if (!REPORTS_LIST) return;

  const index = REPORTS_LIST.findIndex(el => el.id === reportId);
  REPORTS_LIST.splice(index, 1);

  localStorage.setItem('reportsList', JSON.stringify(REPORTS_LIST));
};

export const findReportToEditFromLocalStorage = function (reportId) {
  const data = JSON.parse(localStorage.getItem('reportsList'));

  // Find report to be edited
  const reportToEdit = data.find(el => el.id === reportId);
  state.report = reportToEdit;
};
