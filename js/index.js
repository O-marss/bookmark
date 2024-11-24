let siteNameInput = document.getElementById("siteNameInput");

let siteUrlInput = document.getElementById("siteUrlInput");

let submitBtn = document.getElementById("submit");

let allSitesSection = document.getElementById('allSitesSection')

let allSitesTable = document.getElementById("allSitesTable");

let foldersTable = document.getElementById("foldersTable");

let errorWrapper = document.getElementById("errorWrapper");

let addListInput = document.getElementById("addListInput");

let foldersSection = document.getElementById("foldersSection");

let eachFolderSection = document.getElementById('eachFolderSection')

let eachFolderTable = document.getElementById('eachFolderTable')

let sitesList = [];
let folderList = [];

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

addListInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSite();
  }
});

if (localStorage.getItem("Sites List") !== null) {
  sitesList = JSON.parse(localStorage.getItem("Sites List"));
  displayAllSites(sitesList);
}

if (localStorage.getItem("Folders") !== null) {
  folderList = JSON.parse(localStorage.getItem("Folders"));
}

document.getElementById("exitIcon").addEventListener("click", exit);

document.getElementById("tryBtn").addEventListener("click", exit);

document.querySelector('.folderCaption').addEventListener('click', function(event){
  foldersSection.classList.remove('d-none');
  foldersSection.classList.add('d-block')
  allSitesSection.classList.remove('d-block')
  allSitesSection.classList.add('d-none');
  eachFolderSection.classList.add('d-none');
  eachFolderSection.classList.remove('d-block')
  displayFolders(folderList);

})

document.querySelector('.sitesCaption').addEventListener('click', function(event){
  foldersSection.classList.remove('d-block');
  foldersSection.classList.add('d-none')
  allSitesSection.classList.remove('d-none')
  allSitesSection.classList.add('d-block')
  eachFolderSection.classList.add('d-none')
  eachFolderSection.classList.remove('d-block')
  displayFolders(folderList);

})

document.querySelector('.sitesTable').addEventListener('click', function(event){
  foldersSection.classList.remove('d-none');
  foldersSection.classList.add('d-block')
  allSitesSection.classList.remove('d-block')
  allSitesSection.classList.add('d-none');
  eachFolderSection.classList.add('d-none');
  eachFolderSection.classList.remove('d-block')
})


document.querySelector('.folderTable').addEventListener('click', function(event){
  foldersSection.classList.remove('d-block');
  foldersSection.classList.add('d-none')
  allSitesSection.classList.remove('d-none')
  allSitesSection.classList.add('d-block')
  eachFolderSection.classList.add('d-none')
  eachFolderSection.classList.remove('d-block')
})

function validate(e) {
  let siteRegex = {
    siteNameInput: /^[A-Za-z0-9]{3,}(?:[ ]?[A-Za-z0-9]+)*$/,
    siteUrlInput:
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/
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
    addFolder(sites);
    sitesList.push(sites);
    displayAllSites(sitesList);
    reset();
    localStorage.setItem("Sites List", JSON.stringify(sitesList));
  } else {
    displayError();
  }
}

function addFolder(obj) {
  let folder = {
    name: addListInput.value,
    listOfSites: [],
  };
  let folderCheck = false;
  if (addListInput.value) {
    if (localStorage.getItem("Folders") !== null) {
      for (const element of folderList) {
        if (folder.name === element.name) {
          element.listOfSites.push(obj);
          folderCheck = true;
        } 
      }
      if(!folderCheck){
        folder.listOfSites.push(obj)
        folderList.push(folder)
      }
    } else{
      folder.listOfSites.push(obj)
      folderList.push(folder)}
  }
  localStorage.setItem("Folders", JSON.stringify(folderList));
}

function displayAllSites(arr) {
  let allSitesHtml = ``;
  for (let i = 0; i < arr.length; i++) {
    allSitesHtml += `
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
  allSitesTable.innerHTML = allSitesHtml;
}

function displayFolders(arr) {
  let foldersHtml = ``;
  for (let i = 0; i < arr.length; i++) {
    foldersHtml += `
                    <tr>
                      <th scope="row">${arr[i].name}</th>
                      <td colspan="1">
                        <button id="open" class="visit btn btn-sm" onclick="openFolder(${i})"
                          ><i class="fas fa-eye me-2"></i>Open</button
                        >
                      </td>
                      <td colspan="1">
                        <button class="delete btn btn-sm btn-outline-danger" onclick="deleteFolder(${i})"
                          <i class="fas fa-trash-alt me-2"></i>Delete
                        </button>
                      </td>
                    </tr>
                `;
  }
  foldersTable.innerHTML = foldersHtml;
}

function displayEachFolder(index) {
  let folder = folderList[index];
  let eachFolderHtml = `<thead><tr><th colspan="3">${folder.name}</th></tr></thead>`;
  folder.listOfSites.forEach((site, i) => {
    eachFolderHtml += `
      <tr>
        <td>${site.name}</td>
        <td><a href="https://${site.url}" class="visit btn btn-sm"><i class="fas fa-eye me-2"></i>Visit</a></td>
        <td><button class="delete btn btn-sm btn-outline-danger" onclick="deleteSiteFromFolder(${index}, ${i})"><i class="fas fa-trash-alt me-2"></i>Delete</button></td>
      </tr>
    `;
  });
  eachFolderTable.innerHTML = eachFolderHtml;
}

function openFolder(index) {
  allSitesSection.classList.remove('d-block');
  allSitesSection.classList.add('d-none');
  foldersSection.classList.remove("d-block");
  foldersSection.classList.add("d-none");
  eachFolderSection.classList.remove("d-none");
  eachFolderSection.classList.add("d-block");

  displayEachFolder(index);
}


function reset() {
  siteUrlInput.value = null;
  siteNameInput.value = null;
  addListInput.value = null;

  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");

  siteNameInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-invalid");
}

function deleteSite(deleteIndex) {
  sitesList.splice(deleteIndex, 1);
  localStorage.setItem("Sites List", JSON.stringify(sitesList));

  displayAllSites(sitesList);
}

function deleteFolder(deleteIndex) {
  folderList.splice(deleteIndex, 1);
  localStorage.setItem("Folders", JSON.stringify(folderList));

  displayFolders(folderList);
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