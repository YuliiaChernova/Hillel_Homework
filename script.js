const NOTES_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/';

const DELETE_BTN_CLASS = 'delete-note-btn';
const NOTE_TEXTAREA_CLASS = 'note-body';
const NOTE_CLASS = 'note-container';
const NOTE_BODY_CLASS = 'note-body';

const addBtn = document.getElementById('add-note-btn');
const noteTemplate = document.getElementById('note-template').innerHTML;
const notesArea = document.getElementById('notes-area');

let notesList = [];

addBtn.addEventListener('click', onAddBtnClick);
notesArea.addEventListener('click', onDeleteNoteBtnClick);
notesArea.addEventListener('change', onNoteBodyChange);

init();

function init() {
    getNotes();
}

function onAddBtnClick() {
    addNewNote();
}

function onNoteBodyChange(event) {
    switch(true) {
        case(event.target.classList.contains(NOTE_BODY_CLASS)):
            setNewValue(event.target.closest(`.${NOTE_CLASS}`).dataset.id);
            break;
    }
}

function setNewValue(id) {

    const changedNoteObj = notesList.find((el) => el.id == id);

    const changedNoteInput = document.querySelector(`div[data-id="${id}"]`).children[1];

    changedNoteObj.description = changedNoteInput.value;

    
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

function onDeleteNoteBtnClick(event) {
    switch(true) {
        case (event.target.classList.contains(DELETE_BTN_CLASS)):
            deleteNote(event.target.closest(`.${NOTE_CLASS}`).dataset.id);
            break;
    }
}

function addNewNote() {

    const note = {
        description: '',
    }

    saveNewNote(note)
        .then(getNotes);
    
}

function resetRender() {
    notesArea.innerHTML = '';
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
        .then(resetRender)
        .then(renderAllNotes);
}

function renderOneNote(note) {
    const htmlNote = noteTemplate.replace('{{id}}', note.id)
                                 .replace('{{body}}', note.description);
    
    notesArea.insertAdjacentHTML('beforeend', htmlNote);
    
}

function renderAllNotes() {
    notesList.forEach(note => renderOneNote(note));
}

function deleteNote(id) {
    fetch(NOTES_URL + id, {
        method: 'DELETE',
    }).then(getNotes);
}