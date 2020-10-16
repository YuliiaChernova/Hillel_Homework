$(() => {
    const CONTACTS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';
    const DELETE_BTN_CLASS = 'delete-btn-class';
    const EDIT_BTN_CLASS = 'edit-btn-class';
    const NEW_BTN_ROW_CLASS = 'new-contact-row';

    const contactTemplate = $('#template').html();
    const $addBtn = $('#add-btn');
    const $dialog = $('#dialog-form');

    const $contactBook = $('#contact-book');
    const $headerRow = $('#header-row');
    const $id = $('#id');
    const $name = $('#name');
    const $surname = $('#surname');
    const $phone = $('#phone');

    let contactList = [];

    init();

    $addBtn.on('click', onAddBtnClick);
    $contactBook.on('click', '.' + DELETE_BTN_CLASS, onDeleteNoteBtnClick);
    $contactBook.on('click', '.' + EDIT_BTN_CLASS, onEditNoteBtnClick);

    function init() {
        getContacts();
    }

    function onAddBtnClick() {   
        openModal();
    }

    function onDeleteNoteBtnClick() {
        deleteNote($(this).closest('.' + NEW_BTN_ROW_CLASS).data('id'))
    }

    function onEditNoteBtnClick() {
        openModal();
        getEditedContact($(this).closest('.' + NEW_BTN_ROW_CLASS).data('id'));
    }

    function getContacts() {
        return fetch(CONTACTS_URL)
                .then(responce => responce.json())
                .then((data) => (contactList = data))
                .then(resetRender)
                .then(renderAllContacts)
    }

    function resetRender() {
        $contactBook.html($headerRow.html());
    }

    function renderOneContact(contact) {
        const htmlContact = contactTemplate.replace('{{name}}', contact.name)
                                           .replace('{{surname}}', contact.surname)
                                           .replace('{{phone}}', contact.phone)
                                           .replace('{{id}}', contact.id);
        
        $contactBook.append(htmlContact);
    }

    function renderAllContacts() {
        contactList.forEach(contact => renderOneContact(contact));
    }

    function openModal() {
        $dialog.dialog('open');
    }

    $dialog.dialog({
        autoOpen: false,
        height: 270,
        width: 320,
        modal: true,
        buttons: {
            'Сохранить': () => {                
                    submitForm();
                    $dialog.dialog('close');
                    clearInputs();
            },

            'Отмена': () => $dialog.dialog('close'),
        }
    });

    function submitForm() {
        const contact = {
            id: $id.val(),
            name: $name.val(),
            surname: $surname.val(),
            phone: $phone.val(),
        }

        if (contact.id) {
            editContact(contact)
                .then(getContacts);;
        } else {
            createContact(contact)
                .then(getContacts);
        }

    }

    function editContact(contact) {
        return fetch(CONTACTS_URL + contact.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        })
    }

    function createContact(contact) {
        return fetch(CONTACTS_URL, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-type': 'application/json',
            },
        });
    }

    function clearInputs() {
        $id.val(''),
        $name.val('');
        $surname.val('');
        $phone.val('');
    }

    function deleteNote(id) {
        fetch(CONTACTS_URL + id, {
            method: 'DELETE',
        }).then(getContacts);
    }
    

    function getEditedContact(id) {
        const changedNoteObj = contactList.find((el) => el.id == id);

        fillContactInputs(changedNoteObj);
    }

    function fillContactInputs(obj) {
        $id.val(obj.id);
        $name.val(obj.name);
        $surname.val(obj.surname);
        $phone.val(obj.phone);
    }
    
});
