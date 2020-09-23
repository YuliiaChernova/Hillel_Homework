const DELETE_BTN_CLASS = 'delete-btn';

const contactBook = document.getElementById('contact-book');
const contactNameInput = document.getElementById('name');
const contactPhoneInput = document.getElementById('phone');
const contactEmailInput = document.getElementById('email');

const contactTemplate = document.getElementById('contactTemplate').innerHTML;
const addBtn = document.getElementById('add-btn');

let contactList = [];

addBtn.addEventListener('click', onAddContactBtnClick);
contactBook.addEventListener('click', onDeleteContactBtnClick);

initialize();

function initialize() {
    restoreContact();
    renderContactList();
}

function onAddContactBtnClick() {
    getNewContact();
}

function getNewContact() {
   const newContact = {
       id: Math.random(),
       name: contactNameInput.value,
       phone: contactPhoneInput.value,
       email: contactEmailInput.value,
   };

   checkNotEmptyInputs(newContact);
}

function checkNotEmptyInputs(contact) {
    if(contact.name && contact.phone && contact.email) {
        contactList.push(contact);
        saveContact();
        renderContact(contact);
        clearInputs();
    } else {
        alert('Заполните все поля');
    }
}

function renderContact(contact) {
    const htmlContact = contactTemplate.replace('{{name}}', contact.name)
                                       .replace('{{phone}}', contact.phone)
                                       .replace('{{email}}', contact.email)
                                       .replace('{{id}}', contact.id);
    contactBook.insertAdjacentHTML('beforeend', htmlContact);
}

function renderContactList() {
    contactList.forEach(contact => renderContact(contact));
}

function onDeleteContactBtnClick(event) {
    if (event.target.classList.contains(DELETE_BTN_CLASS)) {
        deleteContact(event.target.parentElement);
    }
}

function deleteContact(el) {
    const contactId = +el.dataset.contactId;
    contactList = contactList.filter((contact) => contact.id !== contactId);
    saveContact();
    el.remove();
}

function clearInputs() {
    contactNameInput.value = '';
    contactPhoneInput.value = '';
    contactEmailInput.value = '';
}

function saveContact() {
    localStorage.setItem('AddedContact', JSON.stringify(contactList));
}

function restoreContact() {
    const contact = localStorage.getItem('AddedContact');
    contactList = contact ? JSON.parse(contact) : [];
}