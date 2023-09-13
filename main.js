document.addEventListener('DOMContentLoaded', function () {
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');

    // Initialize notes from local storage
    let notes = getNotesFromLocalStorage();

    function getNotesFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem('notes')) || [];
        } catch (error) {
            alert("Error in retrieving notes");
            return [];
        }
    }

    function saveNotesToLocalStorage(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function displayNotes() {
        notesList.innerHTML = '';

        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.className = "note";

            const deleteButton = document.createElement('span');
            deleteButton.classList.add('delete-btn');
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-beat-fade"></i>';
            deleteButton.addEventListener('click', () => deleteNote(index));

            const noteContent = document.createElement('span');
            noteContent.textContent = note;

            noteDiv.appendChild(deleteButton);
            noteDiv.appendChild(noteContent);
            notesList.appendChild(noteDiv);
        });
    }

    function addNote() {
        const noteText = noteInput.value.trim();

        if (noteText === '') {
            alert('Please enter a valid note.');
            return;
        }

        notes.push(noteText);
        saveNotesToLocalStorage(notes);

        noteInput.value = '';
        displayNotes();
    }

    function deleteNote(index) {
        notes.splice(index, 1);
        saveNotesToLocalStorage(notes);
        displayNotes();
    }

    addNoteBtn.addEventListener('click', addNote);
    displayNotes();
});