import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  const onAddNote = () => {
    console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
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
      <Main></Main>
    </div>
  );
}

export default App;
