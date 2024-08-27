const mainContainer = document.querySelector(".main");

//Digital clock

const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const day = document.querySelector("#day");
const date = document.querySelector("#date");
const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNumber = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
function formateData(value) {
  if (value < 10) {
    return "0";
  } else {
    return "";
  }
}
function clock() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const dday = d.getDate();
  const month = monthNumber[d.getMonth()];

  hours.innerHTML = formateData(h) + h;
  minutes.innerHTML = formateData(m) + m;
  day.innerHTML = dayOfWeek[d.getDay()];
  date.innerHTML =
    formateData(dday) + dday + " " + month + " " + d.getFullYear();
}
setInterval(clock, 1000);

// Weather app

const apiKey = "21aea8b3f9a6f7248f9bd083a002ecba";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const inputWeather = document.querySelector("#weather-app-input");
const weatherBtn = document.querySelector("#weather-app-btn");
const cityName = document.querySelector("#city-name");
const weatherIcon = document.querySelector(".weather-icon-container img");
const weatherTemp = document.querySelector(".weather-temperature");
const windInfo = document.querySelector("#wind-value");
const humidityInfo = document.querySelector("#humidity-value");
const weatherBlock = document.querySelector("#weather-info");
const errorMessage = document.querySelector("#error-message");
const weatherMessage = document.querySelector("#weather-message");
const weatherDescription = document.querySelector("#weather-description");
const tempMax = document.querySelector("#max-temp");
const tempMin = document.querySelector("#min-temp");
const sunriseTime = document.querySelector("#sunrise-time");
const sunsetTime = document.querySelector("#sunset-time");

async function weatherApp(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();
  console.log(data);
  if (response.status == 404) {
    errorMessage.style.display = "block";
    weatherBlock.style.display = "none";
  } else {
    weatherTemp.innerHTML = Math.round(data.main.temp) + "°C";
    humidityInfo.innerHTML = data.main.humidity + "%";
    windInfo.innerHTML = data.wind.speed + "km/h";
    cityName.innerHTML = data.name;
    weatherDescription.innerHTML = data.weather[0].description;
    tempMin.innerHTML = "Min: " + Math.round(data.main.temp_min) + "°C";
    tempMax.innerHTML = "Max: " + Math.round(data.main.temp_max) + "°C";

    let sunRiseDate = new Date(
      (data.timezone + data.sys.sunrise) * 1000
    ).toUTCString();
    sunriseTime.innerHTML = sunRiseDate.slice(-12, -7);
    let sunSetDate = new Date(
      (data.timezone + data.sys.sunset) * 1000
    ).toUTCString();
    sunsetTime.innerHTML = sunSetDate.slice(-12, -7);

    weatherBlock.style.display = "flex";
    errorMessage.style.display = "none";
    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon.src = "images/weather-app/clear.png";
        break;
      case "Clouds":
        weatherIcon.src = "images/weather-app/clouds.png";
        break;
      case "Rain":
        weatherIcon.src = "images/weather-app/rain.png";
        break;
      case "Thunderstorm":
        weatherIcon.src = "images/weather-app/storm.png";
        break;
      case "Snow":
        weatherIcon.src = "images/weather-app/snow.png";
        break;

      case "Drizzle":
        weatherIcon.src = "images/weather-app/drizzle.png";
        break;
    }
  }
}

weatherBtn.addEventListener("click", () => {
  if (inputWeather.value === "") {
    errorMessage.style.display = "block";
    weatherBlock.style.display = "none";
    weatherMessage.style.display = "none";
  } else {
    weatherApp(inputWeather.value);
    inputWeather.value = "";
    weatherMessage.style.display = "none";
  }
});

//to-do-list
const toDoInput = document.querySelector("#to-do-input");
const toDoButton = document.querySelector("#to-do-btn");
const toDoListItems = document.querySelector("#to-do-list-items");
const toDoListOpenBtn = document.querySelector("#to-do-list-open-btn");
const toDoListContainer = document.querySelector(".to-do-list-container");
const toDoCloseIcon = document.querySelector("#to-do-close-icon");

toDoListOpenBtn.addEventListener("click", () => {
  mainContainer.style.display = "none";
  toDoListContainer.style.display = "flex";
});

toDoCloseIcon.addEventListener("click", () => {
  toDoListContainer.style.display = "none";
  mainContainer.style.display = "block";
});

function addingTasks() {
  toDoButton.addEventListener("click", () => {
    if (toDoInput.value === "") {
      alert("Write a task first:)");
    } else {
      let liItem = document.createElement("li");
      liItem.textContent = toDoInput.value;
      toDoListItems.appendChild(liItem);
      let spanElement = document.createElement("span");
      liItem.appendChild(spanElement);
      toDoInput.value = "";
      saveData();
    }
  });
}
addingTasks();

function taskIsDone() {
  toDoListItems.addEventListener("click", (element) => {
    if (element.target.tagName === "LI") {
      element.target.classList.toggle("checked");
      saveData();
    } else if (element.target.tagName === "SPAN") {
      element.target.parentElement.remove();
      saveData();
    }
  });
}
taskIsDone();
function saveData() {
  localStorage.setItem("data", toDoListItems.innerHTML);
}
function showData() {
  toDoListItems.innerHTML = localStorage.getItem("data");
}
showData();

//calculator

const calculatorDisplay = document.querySelector("#calculator-display");
const calculatorOpenBtn = document.querySelector("#calculator-open-btn");
const calculatorContainer = document.querySelector(".calculator-container");
const calcCloseIcon = document.querySelector("#calc-close-icon");

calculatorOpenBtn.addEventListener("click", () => {
  mainContainer.style.display = "none";
  calculatorContainer.style.display = "flex";
});

calcCloseIcon.addEventListener("click", () => {
  calculatorContainer.style.display = "none";
  mainContainer.style.display = "block";
});

function display(input) {
  calculatorDisplay.value += input;
}
function clearDisplay() {
  calculatorDisplay.value = "";
}
function deleteNumber() {
  calculatorDisplay.value = calculatorDisplay.value.toString().slice(0, -1);
}
function roundNumber(data) {
  let resultLength = data.toString().length;
  if (resultLength > 8) {
    data = data.toFixed(8);
    calculatorDisplay.value = data;
  }
}
function calculate() {
  try {
    let result = eval(calculatorDisplay.value);
    calculatorDisplay.value = result;
    roundNumber(result);
  } catch (error) {
    calculatorDisplay.value = "I can't handle it";
  }
}
function squareRoot() {
  let squareRootResult = Math.sqrt(calculatorDisplay.value, 2);
  calculatorDisplay.value = squareRootResult;
  roundNumber(squareRootResult);
}
function square() {
  let squaredResult = Math.pow(calculatorDisplay.value, 2);
  calculatorDisplay.value = squaredResult;
}

// Note-app

const noteAppOpenBtn = document.querySelector("#note-app-open-btn");
const noteAppContainer = document.querySelector(".note-app-container");
const noteAppCloseIcon = document.querySelector("#note-app-close-icon");
const addNewNoteBtn = document.querySelector(".add-new-note");
const addNewNoteElement = document.querySelector(".add-new-note-item");
const noteApp = document.querySelector("#note-app");

noteAppOpenBtn.addEventListener("click", () => {
  mainContainer.style.display = "none";
  noteAppContainer.style.display = "block";
});

noteAppCloseIcon.addEventListener("click", () => {
  noteAppContainer.style.display = "none";
  mainContainer.style.display = "block";
});

getNotes().forEach((note) => {
  const newNoteEl = newNote(note.id, note.content);
  addNewNoteElement.insertAdjacentElement("afterend", newNoteEl);
});

addNewNoteBtn.addEventListener("click", addNote);

function newNote(id, content) {
  const note = document.createElement("textarea");
  note.classList.add("note-item");
  note.placeholder = "Write your note here...";
  note.spellcheck = false;
  note.id = id;
  note.value = content;
  note.addEventListener("input", () => {
    updateNote(id, note.value);
  });
  note.addEventListener("dblclick", () => {
    const message = confirm("Do you really want to delete this note?");
    if (message) {
      deleteNote(id, note);
    }
  });

  return note;
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Date.now(),
    content: "",
  };
  const newNoteEl = newNote(noteObj.id, noteObj.content);
  addNewNoteElement.insertAdjacentElement("afterend", newNoteEl);
  notes.push(noteObj);
  saveNotes(notes);
}
function updateNote(id, content) {
  const notes = getNotes();
  const updatedNote = notes.filter((note) => note.id === id)[0];
  updatedNote.content = content;
  saveNotes(notes);
}

function deleteNote(id, note) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  noteApp.removeChild(note);
}
function saveNotes(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}
function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

//copyright

const copyrightEl = document.querySelector(".copyright-text");

const year = new Date().getFullYear();

copyrightEl.innerHTML = `Copyright ${year}`;
