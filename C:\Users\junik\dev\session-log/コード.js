const buttons = {
  'Research': 7,
  'Ph 125 prep': 6,
  'Math fun papers': 2,
  'Fun physics': 5,
  'Ma 1c/162a': 9,
  'Email Check': 8,
  'Recreational study': 8,
  'Fun coding': 1,
}

function doGet(){
  const title = PropertiesService.getScriptProperties().getProperty("SESSION_TITLE");
  const start = PropertiesService.getScriptProperties().getProperty("SESSION_START");
  let template = HtmlService.createTemplateFromFile("index");
  template.session = { title, start };
  return template.evaluate();
}

function resetProperties() {
  PropertiesService.getScriptProperties().setProperty("SESSION_TITLE", "");
  PropertiesService.getScriptProperties().setProperty("SESSION_START", 0);
}

function start(title) {
  const start = now();
  PropertiesService.getScriptProperties().setProperty("SESSION_TITLE", title);
  PropertiesService.getScriptProperties().setProperty("SESSION_START", start);
  return start;
}

function formatDateInYyyymmdd(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const yyyy = y.toString();
  const mm = ("00" + m).slice(-2);
  const dd = ("00" + d).slice(-2);
  return yyyy + "/" + mm + "/" + dd;
}
function formatDateInHhmmss(date){
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const hh = ("00" + h).slice(-2);
  const mm = ("00" + m).slice(-2);
  const ss = ("00" + s).slice(-2);
  return hh + ":" + mm + ":" + ss;
}
function now() {
  const nowDate = new Date();
  return formatDateInYyyymmdd(nowDate) + " " + formatDateInHhmmss(nowDate);
}

function stop() {
  const title = PropertiesService.getScriptProperties().getProperty("SESSION_TITLE");
  const start = new Date(PropertiesService.getScriptProperties().getProperty("SESSION_START"));
  const end = new Date();
  const calendar = CalendarApp.getCalendarById("fd630fb5fd00d61e4afac400c6adaa0a340da6a3537a1f7fba40e4be4dde87ea@group.calendar.google.com");
  var newEvent;
  newEvent = calendar.createEvent(title, start, end);
  if (Object.keys(buttons).includes(title)) {
    newEvent.setColor(buttons[title]);
  }

  PropertiesService.getScriptProperties().setProperty("SESSION_TITLE", "");
  PropertiesService.getScriptProperties().setProperty("SESSION_START", 0);
}
