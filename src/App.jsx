import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // relaod時にactiveNoteを設定する
  useEffect(() => {
    if (notes.length > 0) {
      setActiveNote(notes[0].id);
    } else {
      setActiveNote(false);
    }
  }, []);

  const onAddNote = () => {
    console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUudateNote = (updateNote) => {
    const updateNotesArray = notes.map((note) => {
      if (note.id === updateNote.id) {
        return updateNote;
      }
      return note;
    });

    setNotes(updateNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      ></Sidebar>
      <Main activeNote={getActiveNote()} onUpdateNote={onUudateNote}></Main>
    </div>
  );
}

export default App;
