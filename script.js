let listDiscount = [];
function load() {
  const url = "http://localhost:3000/simulator/";
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send();

  request.onload = function () {
    let response = JSON.parse(request.response);
    listDiscount = response.data;

    getModality();
  };
}

function getModality() {
  let distinct = [];
  for (const element of listDiscount) {
    if (distinct.indexOf(element.modality) === -1) {
      distinct.push(element.modality);
    }
  }

  let selectModality = document.getElementById("modality");
  while (selectModality.firstElementChild) {
    selectModality.firstElementChild.remove();
  }

  let opt = document.createElement("option");
  opt.value = "";
  opt.innerHTML = "Selecione a modalidade de ingresso";
  selectModality.appendChild(opt);
  for (const element of distinct) {
    let opt = document.createElement("option");
    opt.value = element;
    opt.innerHTML = element;
    selectModality.appendChild(opt);
  }

  selectModality.addEventListener("change", function () {
    getCourses();
  });
}

function getCourses() {
  let distinct = [];

  document.getElementById("percet").innerText = "0";
  document.getElementById("full_monthly").innerText = "0,00";
  document.getElementById("final_monthly").innerText = "0,00";

  let selectModality = document.getElementById("modality");
  let selectCourses = document.getElementById("courses");
  let selectShifts = document.getElementById("shifts");

  selectCourses.value = "";
  selectShifts.value = "";

  while (selectCourses.firstElementChild) {
    selectCourses.firstElementChild.remove();
  }

  let opt = document.createElement("option");
  opt.value = "";
  opt.innerHTML = "Escolha o curso";
  selectCourses.appendChild(opt);

  while (selectShifts.firstElementChild) {
    selectShifts.firstElementChild.remove();
  }

  let optShifts = document.createElement("option");
  optShifts.value = "";
  optShifts.innerHTML = "Turno";
  selectShifts.appendChild(optShifts);

  if (selectModality.value === "") return;

  let courses = listDiscount.find(
    (element) => element.modality === selectModality.value
  ).courses;

  for (const element of courses) {
    if (distinct.indexOf(element.course) === -1) {
      distinct.push(element.course);
    }
  }

  while (selectCourses.firstElementChild) {
    selectCourses.firstElementChild.remove();
  }

  for (const element of distinct) {
    let opt = document.createElement("option");
    opt.value = element;
    opt.innerHTML = element;
    selectCourses.appendChild(opt);
  }

  selectCourses.addEventListener("change", function () {
    getTurn();
  });
}

function getTurn() {
  let distinct = [];

  document.getElementById("shifts").value = "Turno";
  document.getElementById("percet").innerText = "0";
  document.getElementById("full_monthly").innerText = "0,00";
  document.getElementById("final_monthly").innerText = "0,00";

  let selectModality = document.getElementById("modality");

  if (selectModality.value === "") return;

  let courses = listDiscount.find(
    (element) => element.modality === selectModality.value
  ).courses;

  let selectCourses = document.getElementById("courses");
  if (selectCourses.value === "") return;

  let shifts = courses.find(
    (element) => element.course === selectCourses.value
  ).shifts;

  for (const element of shifts) {
    if (distinct.indexOf(element.turn) === -1) {
      distinct.push(element.turn);
    }
  }

  let selectShifts = document.getElementById("shifts");
  while (selectShifts.firstElementChild) {
    selectShifts.firstElementChild.remove();
  }

  let opt = document.createElement("option");
  opt.value = "";
  opt.innerHTML = "Turno";
  selectShifts.appendChild(opt);
  for (const element of distinct) {
    let opt = document.createElement("option");
    opt.value = element;
    opt.innerHTML = element;
    selectShifts.appendChild(opt);
  }

  selectShifts.addEventListener("change", function () {
    calculeValue();
  });
}

function calculeValue() {
  let selectCourses = document.getElementById("courses");
  let selectShifts = document.getElementById("shifts");

  let selectModality = document.getElementById("modality");

  if (selectModality.value === "") return;

  let courses = listDiscount.find(
    (element) => element.modality === selectModality.value
  ).courses;

  if (selectCourses.value === "") return;

  let shifts = courses.find(
    (element) => element.course === selectCourses.value
  ).shifts;

  if (selectShifts.value === "") return;
  let values = shifts.find((element) => element.turn === selectShifts.value);

  let percent = values.percent;
  if (Number(values.percent) < 1) {
    percent = Number(values.percent) * 100;
  }

  document.getElementById("percet").innerText = percent
    .toString()
    .replace(".", ",");
  document.getElementById("full_monthly").innerText =
    values.full_monthly.replace(".", ",");
  document.getElementById("final_monthly").innerText =
    values.final_monthly.replace(".", ",");
}
