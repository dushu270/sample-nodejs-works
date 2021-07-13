const fs = require("fs");

const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const RemoveNote = function (title, body) {
  const notes = loadNotes();
  const found = notes.filter(function (note) {
    return note.title !== title;
  });
  if (found.length < notes.length) {
    saveNotes(found);
    console.log("note removed!");
  } else {
    console.log("NOT FOUND");
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  RemoveNote: RemoveNote,
};
