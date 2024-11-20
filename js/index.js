let siteNameInput = document.getElementById("siteNameInput");

let siteUrlInput = document.getElementById("siteUrlInput");

let submitBtn = document.getElementById("submit");

let tableBody = document.getElementById("tableBody");

let sitesList = [];

submitBtn.addEventListener("click", addSite);

if (localStorage.getItem("Sites List") !== null) {
  sitesList = JSON.parse(localStorage.getItem("Sites List"));
  displayTable(sitesList);
}

function validate(e) {
  let siteRegex = {
    siteNameInput: /^[0-9A-Za-z]{3,64}$/,
    siteUrlInput:
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/,
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
    sitesList.push(sites);
    displayTable(sitesList);
    localStorage.setItem("Sites List", JSON.stringify(sitesList));
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
                        }" class="btn btn-outline-primary"><i class="fas fa-eye me-2"></i>Visit</a></td>
                        <td colspan="1"><button class="btn btn-outline-danger"><i class="fas fa-trash-alt me-2"></i>Delete</button></td>
                    </tr>
                `;
  }
  tableBody.innerHTML = tableHtml;
}
