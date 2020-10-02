const DELETE_BTN_CLASS = 'delete-btn';

const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

const contactBook = document.getElementById('contact-book');
const contactNameInput = document.getElementById('name');
const contactSurnameInput = document.getElementById('surname');
const contactPhoneInput = document.getElementById('phone');

const contactTemplate = document.getElementById('contactTemplate').innerHTML;
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', onAddContactBtnClick);
contactBook.addEventListener('click', onContactBookClick);

let contactList = [];

init();

function init() {
    getContacts();
}

function onAddContactBtnClick() {
    getContactInputs();
}

function getContacts() {
    return fetch(CONTACTS_URL)
            .then(responce => responce.json())
            .then((data) => (contactList = data))
            .then(renderAllContacts);
}

function renderAllContacts() {
    contactList.forEach(contact => renderOneContact(contact));
}

function renderOneContact(contact) {
    const htmlContact = contactTemplate.replace('{{name}}', contact.name)
                                       .replace('{{surname}}', contact.surname)
                                       .replace('{{phone}}', contact.phone);
    
    contactBook.insertAdjacentHTML('beforeend', htmlContact);
}

function getContactInputs() {
    const contact = {
        name: contactNameInput.value,
        surname: contactSurnameInput.value,
        phone: contactPhoneInput.value,
    };

    addContact(contact)
        .then(throwRender)
        .then(getContacts);
    
    clearInputs();
}

function throwRender() {
    contactBook.innerHTML = '';
}

function addContact(contact) {
    return fetch(CONTACTS_URL, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Content-type': 'application/json',
        },
    });
}

function clearInputs() {
    contactNameInput.value = '';
    contactPhoneInput.value = '';
    contactSurnameInput.value = '';
}

function onContactBookClick(e) {
    switch(true) {
        case (e.target.classList.contains(DELETE_BTN_CLASS)):
            deleteContact(e.target.parentElement.dataset.id);
            break;
    }
}

function deleteContact(id) {
   fetch(CONTACTS_URL + id, {
       method: 'DELETE',
   }).then(throwRender)
     .then(getContacts);
}