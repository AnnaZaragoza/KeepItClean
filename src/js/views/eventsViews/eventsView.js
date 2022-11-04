class EventsView {
  _parentElement = document.querySelector('.calendar-form');

  handlerUploadEvent(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const guests = document.querySelector(
        '.calendar-form--input-guests'
      ).value;
      // const checkingSelection = document.querySelector(
      //   '.calendar-form--input-checking'
      // );
      // const checking = checkingSelection.value;
      // const time = document.querySelector('.calendar-form--input-time').value;

      // const data = [guests, checking, time];

      // Check for empty fields
      // const dataValues = [guests, checking, time];
      // const oneEmptyField = dataValues.some(v => v === '');

      const data = guests;
      // Handle data
      if (!data) alert('Please, fill up the field!');
      else handler(data);
    });
  }

  handlerUploadEvents(handler) {
    const data = JSON.parse(localStorage.getItem('eventsList'));

    if (!data) return;

    handler(data);
  }

  handlerUploadEventId(handler) {
    const data = localStorage.getItem('id');
    if (!data) return;

    handler(data);
  }
}

export default new EventsView();
