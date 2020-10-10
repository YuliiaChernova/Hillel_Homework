$(() => {

    const NOTES_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/';

    const $addBtn = $('#add-note-btn');
    const $notesArea = $('#notes-area');

    let notesList = [];

    $addBtn.on('click', onAddBtnClick);
    $notesArea.on('click', '.delete-note-btn', onDeleteNoteBtnClick);
    $notesArea.on('change', '.note-body', onNoteBodyChange);

    init();
    
    function init() {
        getNotes();
    }

    function onAddBtnClick() {
        addNewNote();
    }

    function addNewNote() {
        const note = {
            description: '',
        }

        saveNewNote(note)
            .then(getNotes);
    }

    function saveNewNote(note) {
        return fetch(NOTES_URL, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-type': 'application/json',
            },
        });
    }

    function getNotes() {
        return fetch(NOTES_URL)
            .then(responce => responce.json())
            .then((data) => (notesList = data))
            .then(renderAllNotes);
    }

    function renderAllNotes(notes) {

        $notesArea.html(
            notes
                .map((note) => 
                    `<div class="note-container" data-id="${note.id}">
                        <div class="header">
                            <button class="delete-note-btn">✖</button>
                        </div>
                        <textarea class="note-body">${note.description}</textarea>
                    </div>`)
                    .join('')
        );
    }

    function onDeleteNoteBtnClick() {
        deleteNote($(this).closest('.note-container').data('id'));
    }

    function deleteNote(id) {
        fetch(NOTES_URL + id, {
            method: 'DELETE',
        }).then(getNotes);
    }

    function onNoteBodyChange() {
        setNewValue($(this).closest('.note-container').data('id'));
    }

    function setNewValue(id) {

        const changedNoteObj = notesList.find((el) => el.id == id);

        const $changedNoteInput = $(`div[data-id="${id}"]`).children().eq(1);
    
        changedNoteObj.description = $changedNoteInput.val();
    
        
        changeNote(changedNoteObj, changedNoteObj.id);
    }

    function changeNote(note, id) {
        return fetch(NOTES_URL + id, {
            method: 'PUT',
            body: JSON.stringify(note),
            headers: {
                'Content-type': 'application/json',
            },
        });
    }
});


