$(() => {
    const CONTACTS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

    const $contactTemplate = $('#template').html();
    const $addBtn = $('#add-btn');
    const $dialog = $('#dialog-form');

    const $name = $('#name');
    const $surname = $('#surname');
    const $phone = $('#phone');

    let contactList = [];

    $dialog.dialog({
        autoOpen: false,
        height: 270,
        width: 320,
        modal: true,
        buttons: {
            'Сохранить': () => {
                
                const newContact = {
                    name: $name.val(),
                    surname: $surname.val(),
                    phone: $phone.val(),
                }

                createContact(newContact);
                $dialog.dialog('close');
            },

            'Отмена': () => $dialog.dialog('close'),
        }
    });

    $addBtn.on('click', onAddBtnClick);

    function onAddBtnClick() {   
        openModal();
    }

    function openModal() {
        $dialog.dialog('open');
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
});
