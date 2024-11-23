let siteNameInput = document.getElementById("siteNameInput");

let siteUrlInput = document.getElementById("siteUrlInput");

let submitBtn = document.getElementById("submit");

let tableBody = document.getElementById("tableBody");

let errorWrapper = document.getElementById("errorWrapper");
let sitesList = [];

submitBtn.addEventListener(
  "click",

  addSite
);

siteNameInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSite();
  }
});

siteUrlInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSite();
  }
});

if (localStorage.getItem("Sites List") !== null) {
  sitesList = JSON.parse(localStorage.getItem("Sites List"));
  displayTable(sitesList);
}

document.getElementById("exitIcon").addEventListener("click", exit);
document.getElementById("tryBtn").addEventListener("click", exit);

function validate(e) {
  let siteRegex = {
    siteNameInput: /^[A-Za-z0-9]{3,}(?:[ ]?[A-Za-z0-9]+)*$/,
    siteUrlInput:
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i
  };

  if (siteRegex[e.id].test(e.value)) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
  } else {
    e.classList.remove("is-valid");
    e.classList.add("is-invalid");
  }
}

function addSite() {
  let sites = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };

  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    checkDuplicate();
    sitesList.push(sites);
    displayTable(sitesList);
    reset();
    localStorage.setItem("Sites List", JSON.stringify(sitesList));
  } else {
    displayError();
  }
}

function displayTable(arr) {
  let tableHtml = ``;
  for (let i = 0; i < arr.length; i++) {
    tableHtml += `
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td >${arr[i].name}</td>
                        <td colspan="1"><a href="https://${
                          arr[i].url
                        }" class="visit btn btn-sm"><i class="fas fa-eye me-2"></i>Visit</a></td>
                        <td colspan="1"><button class="delete btn btn-sm" onclick="deleteSite(${i})"><i class="fas fa-trash-alt me-2"></i>Delete</button></td>
                    </tr>
                `;
  }
  tableBody.innerHTML = tableHtml;
}

function reset() {
  siteUrlInput.value = null;
  siteNameInput.value = null;

  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");

  siteNameInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-invalid");
}

function deleteSite(deleteIndex) {
  sitesList.splice(deleteIndex, 1);
  localStorage.setItem("Sites List", JSON.stringify(sitesList));

  displayTable(sitesList);
}

function exit() {
  errorWrapper.classList.add("d-none");
}

function displayError() {
  errorWrapper.classList.remove("d-none");
}

function checkDuplicate() {
  for (let i = 0; i < sitesList.length; i++) {
    if (siteUrlInput.value.toLowerCase() === sitesList[i].url.toLowerCase()) {
      sitesList.splice(i, 1);
    }
  }
}