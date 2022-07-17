import { calendar } from './helpers';
import * as eventsModel from './models/eventsModel';
import * as tasksModel from './models/tasksModel';
import * as reportsModel from './models/reportsModel';
import sectionTasksView from './views/sectionTasksView';
import sectionReportsView from './views/sectionReportsView';
import eventsView from './views/eventsViews/eventsView';
import tasksView from './views/tasksViews/tasksView';
import reportsView from './views/reportsViews/reportsView';
import taskView from './views/tasksViews/taskView';
import reportView from './views/reportsViews/reportView';
import eventsFormView from './views/eventsViews/eventsFormView';
import tasksFormView from './views/tasksViews/tasksFormView';
import reportsFormView from './views/reportsViews/reportsFormView';

import { EVENTS_LIST } from './config';
import { TASKS_LIST } from './models/tasksModel';
import { REPORTS_LIST } from './models/reportsModel';
import { setEventsToLocalStorage } from './models/eventsModel';
import { setTasksToLocalStorage } from './models/tasksModel';
import { setReportsToLocalStorage } from './models/reportsModel';
import { removeEventFromLocalStorage } from './models/eventsModel';
import { removeTaskFromLocalStorage } from './models/tasksModel';
import { removeReportFromLocalStorage } from './models/reportsModel';
import { findTaskToEditFromLocalStorage } from './models/tasksModel';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { v4 as uuidv4 } from 'uuid'; // creates unique ids

///////////////////////////////////////////////////////////////////
// CALENDAR CONTROLLERS

const controlAddEvent = function (event) {
  let id = uuidv4(); // Unique id for each newEvent
  eventsModel.uploadEvent(event, id);

  calendar.addEvent(eventsModel.state.event);

  // Saving events (local storage)
  EVENTS_LIST.push(eventsModel.state.event);
  setEventsToLocalStorage();

  // Hidde form
  eventsFormView.handlerHiddeForm();
};

const controlRemoveEvent = function (eventId) {
  removeEventFromLocalStorage(eventId);
};

const controlEventsList = function (events) {
  eventsModel.uploadEventsFromLocalStorage(events);

  // Show data from LS
  events.forEach(e => {
    EVENTS_LIST.push(e);
    calendar.addEvent(e);
  });
};

///////////////////////////////////////////////////////////////////
// TASKS CONTROLLERS

const controlTasksFields = function () {
  tasksFormView.handlerAddNewTaskField();
  tasksFormView.handlerRemoveNewTaskFiel();
};

const controlAddTask = function (task) {
  let id = uuidv4(); // Unique id for each newTask

  tasksModel.uploadTask(task, id);

  taskView.render(tasksModel.state.task);

  // Reseting form
  tasksFormView.resetTasksForm();

  // Saving tasks (local storage)
  TASKS_LIST.push(tasksModel.state.task);
  setTasksToLocalStorage();
};

const controlDeleteTask = function (taskId) {
  // Clear task
  taskView.handlerClearTask();

  // Remove task from LS
  removeTaskFromLocalStorage(taskId);
};

const controlEditTask = function (task) {
  // Remove the input fields added at the form (enables editing more than once)
  tasksFormView.removeRegeneratedFormItems();

  // Clear task
  taskView.handlerClearTask();

  tasksModel.findTaskToEditFromLocalStorage(task);
  removeTaskFromLocalStorage(task);

  // Render task to be edited
  tasksFormView.renderTask(tasksModel.state.task);
};

const controlTasksList = function (tasks) {
  tasksModel.uploadTasksFromLocalStorage(tasks);

  // Show data from LS
  tasks.forEach(t => {
    taskView.render(t);
    TASKS_LIST.push(t);
  });
};

///////////////////////////////////////////////////////////////////
// REPORTS CONTROLLERS

const controlReportsFields = function () {
  reportsFormView.handlerAddNewReportField();
  reportsFormView.handlerRemoveNewReportFiel();
};

const controlAddReport = function (report) {
  let id = uuidv4(); // Unique id for each newreport

  reportsModel.uploadReport(report, id);

  reportView.render(reportsModel.state.report);

  // Reseting form
  reportsFormView.resetReportsForm();

  // Saving reports (local storage)
  REPORTS_LIST.push(reportsModel.state.report);
  setReportsToLocalStorage();
};

const controlDeleteReport = function (reportId) {
  // Clear report
  reportView.handlerClearReport();

  // Remove report from LS
  removeReportFromLocalStorage(reportId);
};

const controlEditReport = function (report) {
  // Remove the input fields added at the form (enables editing more than once)
  reportsFormView.removeRegeneratedReportsFormItems();

  // Clear report
  reportView.handlerClearReport();

  reportsModel.findReportToEditFromLocalStorage(report);
  removeReportFromLocalStorage(report);

  // Render report to be edited
  reportsFormView.renderReport(reportsModel.state.report);
};

const controlReportsList = function (reports) {
  reportsModel.uploadReportsFromLocalStorage(reports);

  // Show data from LS
  reports.forEach(t => {
    reportView.render(t);
    REPORTS_LIST.push(t);
  });
};

const init = function () {
  taskView.handlerClearTask(controlDeleteTask);
  reportView.handlerClearReport(controlDeleteReport);
  taskView.handlerEditTask(controlEditTask);
  reportView.handlerEditReport(controlEditReport);
  eventsView.handlerUploadEvent(controlAddEvent);
  eventsView.handlerUploadEventId(controlRemoveEvent);
  eventsView.handlerUploadEvents(controlEventsList);
  tasksView.handlerUploadTask(controlAddTask);
  tasksView.handlerUploadTasks(controlTasksList);
  reportsView.handlerUploadReport(controlAddReport);
  reportsView.handlerUploadReports(controlReportsList);
  eventsFormView.handlerHiddeForm(controlAddEvent);
  tasksFormView.handlerAddNewTaskField(controlTasksFields);
  tasksFormView.handlerRemoveNewTaskField(controlTasksFields);
  reportsFormView.handlerAddNewReportField(controlReportsFields);
  reportsFormView.handlerRemoveNewReportField(controlReportsFields);
};
init();

///////////////////////////////////////////////////////////////////
// LOGIN

const accountOwner = {
  username: 'owner',
  password: 'owner',
};
const accountCleaner = {
  username: 'cleaner',
  password: 'cleaner',
};
const accounts = [accountOwner, accountCleaner];

const btnLogin = document.querySelector('.login-form--submit');
const btnLogoff = document.querySelector('.nav-welcome--button');
const usernameInput = document.querySelector('.login-form--username');
const passwordInput = document.querySelector('.login-form--password');
let currentAccount;

const loginSection = document.querySelector('.login-form--container');
const loginUserMessage = document.querySelector('.nav-welcome');
const appHeader = document.querySelector('.header');
const appSections = document.querySelector('.main-sections');
const appTasksForm = document.querySelector('.tasks-form');
const appReportsForm = document.querySelector('.reports-form');

const appTasksEditBtn = document.querySelectorAll('.task--edit-btn');
const appTasksDltBtn = document.querySelectorAll('.task--dlt-btn');
const appReportsEditBtn = document.querySelectorAll('.report--edit-btn');

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  // Checking inputs
  if (!usernameInput.value || !passwordInput.value) {
    alert('Fill up the fields');
  }

  currentAccount = accounts.find(acc => acc.username === usernameInput.value);

  if (currentAccount?.password === passwordInput.value) {
    if (currentAccount.password === accountOwner.password) {
      // Hidde login-section
      loginSection.classList.add('hidden');
      // display app

      appHeader.classList.remove('hidden');
      appSections.classList.remove('hidden');
      // Show welcome message and Hidde reports form
      loginUserMessage.textContent = 'Welcome Owner!';
      appReportsForm.style.display = 'none';

      // Hide also cleaner's buttons
      if (appReportsEditBtn === null) console.log(null);
      if (typeof appReportsEditBtn === 'object') {
        [...appReportsEditBtn].forEach(b => {
          b.style.display = 'none';
        });
      }
    }

    if (currentAccount.password === accountCleaner.password) {
      // Hidde login-section
      loginSection.classList.add('hidden');
      // Display app
      appHeader.classList.remove('hidden');
      appSections.classList.remove('hidden');
      // Show welcome message and hidde tasks form
      loginUserMessage.textContent = 'Welcome Cleaner!';
      appTasksForm.style.display = 'none';

      // Hide also owner's buttons
      if (appTasksEditBtn === null) console.log(null);
      if (typeof appTasksEditBtn === 'object')
        [...appTasksEditBtn].forEach(b => (b.style.display = 'none'));

      if (appTasksDltBtn === null) console.log(null);
      if (typeof appTasksDltBtn === 'object')
        [...appTasksDltBtn].forEach(b => (b.style.display = 'none'));
    }
  }

  calendar.render();
});

btnLogoff.addEventListener('click', function () {
  loginSection.classList.remove('hidden');

  appHeader.classList.add('hidden');
  appSections.classList.add('hidden');

  appTasksForm.style.display = 'block';
  appReportsForm.style.display = 'block';

  if (appTasksEditBtn === null) console.log(null);
  if (typeof appTasksEditBtn === 'object')
    [...appTasksEditBtn].forEach(b => (b.style.display = 'block'));

  if (appTasksDltBtn === null) console.log(null);
  if (typeof appTasksDltBtn === 'object')
    [...appTasksDltBtn].forEach(b => (b.style.display = 'block'));

  if (appReportsEditBtn === null) console.log(null);
  if (typeof appReportsEditBtn === 'object')
    [...appReportsEditBtn].forEach(b => {
      b.style.display = 'block';
    });
});
