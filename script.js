const contactBook = document.getElementById('contact-book');
const contactNameInput = document.getElementById('name');
const contactPhoneInput = document.getElementById('phone');
const contactEmailInput = document.getElementById('email');

const contactTemplate = document.getElementById('contactTemplate').innerHTML;

const addBtn = document.getElementById('add-btn');
const deleteBtn = document.getElementById('delete-btn');

addBtn.addEventListener('click', onAddContactFormSubmit);

function onAddContactFormSubmit() {
    getNewContact();
}

function getNewContact() {
   const newContact = {
       name: contactNameInput.value,
       phone: contactPhoneInput.value,
       email: contactEmailInput.value,
   };

   addContact(newContact);
}

function addContact(contact) {
    const htmlContact = contactTemplate.replace('{{name}}', contact.name)
                                       .replace('{{phone}}', contact.phone)
                                       .replace('{{email}}', contact.email);

    console.log(htmlContact);
    console.log(contactTemplate);
    
    contactBook.insertAdjacentHTML('beforeend', htmlContact);
}