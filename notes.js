const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title, 
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
    
};

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    if (notes.length > filteredNotes.length) {
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse('Your notes'));
    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(n => n.title === title);

    if (note) {
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
    
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote, 
    removeNote: removeNote, 
    listNotes: listNotes, 
    readNote: readNote
};