class List {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Event {
  constructor(id, name, description, date, address) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.address = address;
  }
}

const eventList = new List(1, 'Event List');
var events = [
  new Event(1, 'Event 1', 'Description 1', '2022-01-01', '123 Main St, NY'),
  new Event(2, 'Event 2', 'Description 2', '2022-02-01', '456 Broadway St, NY')
];

let curEvents = 2;
function addEvent(name, description, date, address) {
  const newEvent = new Event(curEvents, name, description, date, address);
  events.push(newEvent);
  newEvent.id = curEvents;
  curEvents += 1;
  return newEvent;
}

function updateEvent(name, description, date, oldName, address) {
  var Event = events.find(w => w.name === oldName);
  Event.name = name;
  Event.description = description;
  Event.date = date;
  Event.address = address;
  return Event;
}

function deleteEvent(id, name) {
  events = events.filter(function(Event) {
    return Event.name !== name;
  });
  return { id };
}

function getList(id) {
  return id === eventList.id ? eventList : null;
}

function getEvent(name) {
  return events.find(w => w.name === name);
}

function getEvents() {
  return events;
}

export {
  Event, List, addEvent,
  deleteEvent, getEvent,
  getEvents, getList, updateEvent
};

