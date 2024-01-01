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
let events = [
  new Event(1, 'Event test', 'A fun event', '2023-01-01', 'Av. São Paulo, São Paulo, São Paulo'),
  new Event(2, 'Event 2', 'An even funnier event', '2024-02-01', '456 Broadway St, NY')
];

let curEvents = 2;
function addEvent(name, description, date, address) {
  const newEvent = new Event(curEvents, name, description, date, address);
  events.push(newEvent);
  newEvent.id = curEvents;
  curEvents += 1;
  return newEvent;
}

function updateEvent(name, description, date, address, oldName) {
  let foundEvent = events.find(w => w.name === oldName);
  foundEvent.name = name;
  foundEvent.description = description;
  foundEvent.date = date;
  foundEvent.address = address;
  return foundEvent;
}

function deleteEvent(id, name) {
  events = events.filter(selectedEvent => selectedEvent.name !== name);
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
