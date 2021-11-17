const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderEditForm(contact) {
  viewSection.innerHTML = "";
  console.log(contact)
  
  const addForm = document.createElement("form");
  addForm.classList.add("form-stack");
  addForm.classList.add("light-shadow");
  addForm.classList.add("center");
  addForm.classList.add("contact-form");

  viewSection.append(addForm);

  const createHeader = document.createElement("h1");
  createHeader.innerText = "Edit " + contact.firstName + " " + contact.lastName;
  addForm.append(createHeader);

  const firstNameLabel = document.createElement("label");
  firstNameLabel.innerText = "First Name:";
  firstNameLabel.setAttribute("for", "first-name-input");
  addForm.append(firstNameLabel);

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("id", "first-name-input");
  firstNameInput.setAttribute("name", "first-name-input");
  firstNameInput.setAttribute("type", "text");
  firstNameInput.value = contact.firstName;
  addForm.append(firstNameInput);

  const lastNameLabel = document.createElement("label");
  lastNameLabel.innerText = "Last Name:";
  lastNameLabel.setAttribute("for", "last-name-input");
  addForm.append(lastNameLabel);

  const lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("id", "last-name-input");
  lastNameInput.setAttribute("name", "last-name-input");
  lastNameInput.setAttribute("type", "text");
  lastNameInput.value = contact.lastName
  addForm.append(lastNameInput);

  const streetLabel = document.createElement("label");
  streetLabel.innerText = "Street:";
  streetLabel.setAttribute("for", "street-input");
  addForm.append(streetLabel);

  const streetInput = document.createElement("input");
  streetInput.setAttribute("id", "street-input");
  streetInput.setAttribute("name", "street-input");
  streetInput.setAttribute("type", "text");
  streetInput.value = contact.address.street
  addForm.append(streetInput);

  const cityLabel = document.createElement("label");
  cityLabel.innerText = "City:";
  cityLabel.setAttribute("for", "city-input");
  addForm.append(cityLabel);

  const cityInput = document.createElement("input");
  cityInput.setAttribute("id", "city-input");
  cityInput.setAttribute("name", "city-input");
  cityInput.setAttribute("type", "text");
  cityInput.value = contact.address.city
  addForm.append(cityInput);

  const postCodeLabel = document.createElement("label");
  postCodeLabel.innerText = "Post Code:";
  postCodeLabel.setAttribute("for", "post-code-input");
  addForm.append(postCodeLabel);

  const postCodeInput = document.createElement("input");
  postCodeInput.setAttribute("id", "post-code-input");
  postCodeInput.setAttribute("name", "post-code-input");
  postCodeInput.setAttribute("type", "text");
  postCodeInput.value = contact.address.postCode
  addForm.append(postCodeInput);

  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "checkbox-section";
  addForm.append(checkboxDiv);

  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("id", "block-checkbox");
  checkboxInput.setAttribute("name", "block-checkbox");
  checkboxInput.setAttribute("type", "checkbox");
  if (contact.blockContact === true) {
    checkboxInput.checked = true
  }
  checkboxDiv.append(checkboxInput);

  const checkboxLabel = document.createElement("label");
  checkboxLabel.innerText = "Block";
  checkboxLabel.setAttribute("for", "block-checkbox");
  checkboxDiv.append(checkboxLabel);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions-section";
  addForm.append(actionsDiv);

  const submitButton = document.createElement("button");
  submitButton.classList.add = "button";
  submitButton.classList.add = "blue";
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Edit"
  actionsDiv.append(submitButton)

  const deleteButton = document.createElement("button");
  deleteButton.classList.add = "button";
  deleteButton.classList.add = "blue";
  deleteButton.innerText = "Delete"
  actionsDiv.append(deleteButton)

  submitButton.addEventListener("click", function () {
    event.preventDefault();
    const newContact = new Object()
    newContact.id = contact.id
    newContact.firstName = firstNameInput.value
    newContact.lastName = lastNameInput.value
    if (checkboxInput.checked === true) {
      newContact.blockContact = true
    } else {
      newContact.blockContact = false
    }
    newContact.addressId = contact.id

    console.log(newContact)

    let contactsAddress = "http://localhost:3000/contacts/" + contact.id
    let addressesAddress = "http://localhost:3000/addresses/" + contact.id
    
    fetch(contactsAddress, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(newContact)
    })

    const newAddress = new Object()
    newAddress.id = newContact.addressId
    newAddress.street = streetInput.value
    newAddress.city = cityInput.value
    newAddress.postCode = postCodeInput.value

    console.log(newAddress)

    fetch(addressesAddress, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(newAddress)
    })
  });

  deleteButton.addEventListener("click", function () {

    event.preventDefault();

    let contactsAddress = "http://localhost:3000/contacts/" + contact.id
    let addressesAddress = "http://localhost:3000/addresses/" + contact.id

    fetch(contactsAddress, {
      method: "DELETE",
    })

    fetch(addressesAddress, {
      method: "DELETE",
    })
  })
}

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    renderEditForm(contact)
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function renderAddForm() {
  viewSection.innerHTML = "";
  
  const addForm = document.createElement("form");
  addForm.classList.add("form-stack");
  addForm.classList.add("light-shadow");
  addForm.classList.add("center");
  addForm.classList.add("contact-form");

  viewSection.append(addForm);

  const createHeader = document.createElement("h1");
  createHeader.innerText = "Create Contact";
  addForm.append(createHeader);

  const firstNameLabel = document.createElement("label");
  firstNameLabel.innerText = "First Name:";
  firstNameLabel.setAttribute("for", "first-name-input");
  addForm.append(firstNameLabel);

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("id", "first-name-input");
  firstNameInput.setAttribute("name", "first-name-input");
  firstNameInput.setAttribute("type", "text");
  addForm.append(firstNameInput);

  const lastNameLabel = document.createElement("label");
  lastNameLabel.innerText = "Last Name:";
  lastNameLabel.setAttribute("for", "last-name-input");
  addForm.append(lastNameLabel);

  const lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("id", "last-name-input");
  lastNameInput.setAttribute("name", "last-name-input");
  lastNameInput.setAttribute("type", "text");
  addForm.append(lastNameInput);

  const streetLabel = document.createElement("label");
  streetLabel.innerText = "Street:";
  streetLabel.setAttribute("for", "street-input");
  addForm.append(streetLabel);

  const streetInput = document.createElement("input");
  streetInput.setAttribute("id", "street-input");
  streetInput.setAttribute("name", "street-input");
  streetInput.setAttribute("type", "text");
  addForm.append(streetInput);

  const cityLabel = document.createElement("label");
  cityLabel.innerText = "City:";
  cityLabel.setAttribute("for", "city-input");
  addForm.append(cityLabel);

  const cityInput = document.createElement("input");
  cityInput.setAttribute("id", "city-input");
  cityInput.setAttribute("name", "city-input");
  cityInput.setAttribute("type", "text");
  addForm.append(cityInput);

  const postCodeLabel = document.createElement("label");
  postCodeLabel.innerText = "Post Code:";
  postCodeLabel.setAttribute("for", "post-code-input");
  addForm.append(postCodeLabel);

  const postCodeInput = document.createElement("input");
  postCodeInput.setAttribute("id", "post-code-input");
  postCodeInput.setAttribute("name", "post-code-input");
  postCodeInput.setAttribute("type", "text");
  addForm.append(postCodeInput);

  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "checkbox-section";
  addForm.append(checkboxDiv);

  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("id", "block-checkbox");
  checkboxInput.setAttribute("name", "block-checkbox");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxDiv.append(checkboxInput);

  const checkboxLabel = document.createElement("label");
  checkboxLabel.innerText = "Block";
  checkboxLabel.setAttribute("for", "block-checkbox");
  checkboxDiv.append(checkboxLabel);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "actions-section";
  addForm.append(actionsDiv);

  const submitButton = document.createElement("button");
  submitButton.classList.add = "button";
  submitButton.classList.add = "blue";
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Create"
  actionsDiv.append(submitButton)

  submitButton.addEventListener("click", function () {
    event.preventDefault();
    const newContact = new Object()
    newContact.id = state.contacts.length + 1
    newContact.firstName = firstNameInput.value
    newContact.lastName = lastNameInput.value
    if (checkboxInput.checked === true) {
      newContact.blockContact = true
    } else {
      newContact.blockContact = false
    }
    newContact.addressId = state.contacts.length + 1

    console.log(newContact)

    fetchLink = 
    
    fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(newContact)
    })

    const newAddress = new Object()
    newAddress.id = newContact.addressId
    newAddress.street = streetInput.value
    newAddress.city = cityInput.value
    newAddress.postCode = postCodeInput.value

    console.log(newAddress)

    fetch("http://localhost:3000/addresses", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(newAddress)
    })
  });
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    renderAddForm()
  });
}

// [TODO] Write Code

function main() {
  listenNewContactButton();
  getContacts();
}

main();
