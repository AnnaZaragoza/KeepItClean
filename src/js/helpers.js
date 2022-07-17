import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import enGbLocale from '@fullcalendar/core/locales/en-gb';

import eventsFormView from './views/eventsViews/eventsFormView';

export let calendar = new Calendar(calendarEl, {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  timeZone: 'UTC',
  locale: enGbLocale,
  initialView: 'dayGridMonth',
  fixedWeekCount: false,
  headerToolbar: {
    right: 'prev,next',
    center: 'title',
    left: 'today',
  },
  contentHeight: '350px',
  selectable: true,
  editable: false,
  dateClick: function (info) {
    eventsFormView.handlerShowForm();
    localStorage.setItem('startDate', info.dateStr);
  },
  select: function (selectionInfo) {
    eventsFormView.handlerShowForm();
    localStorage.setItem('startDate', selectionInfo.startStr);
    localStorage.setItem('endDate', selectionInfo.endStr);
  },
  eventClick: function (info) {
    localStorage.setItem('id', info.event._def.publicId);
    calendar.getEventById(info.event._def.publicId).remove();
  },
});
