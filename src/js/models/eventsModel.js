export let EVENTS_LIST = [];

export const state = {
  event: {},
};

export const uploadEvent = function (newEvent, id) {
  // Create a event object:
  const event = {
    id,
    guests: newEvent[0],
  };
  // Define state event
  state.event = {
    id: event.id,
    title: `${event.guests} guests`,
    start: localStorage.getItem('startDate'),
    end: localStorage.getItem('endDate'),
  };
};

export const setEventsToLocalStorage = function () {
  localStorage.setItem('eventsList', JSON.stringify(EVENTS_LIST));
};

export const uploadEventsFromLocalStorage = function (eventsList) {
  EVENTS_LIST = eventsList;
};

export const removeEventFromLocalStorage = function (eventId) {
  const data = JSON.parse(localStorage.getItem('eventsList'));

  // const index = EVENTS_LIST.findIndex(el => el.id === eventId);
  const index = data.findIndex(el => el.id === eventId);

  if (index === -1) return;

  data.splice(index, 1);

  localStorage.setItem('eventsList', JSON.stringify(data));
};
