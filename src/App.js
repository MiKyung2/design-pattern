import { useRef, useState } from 'react';
import './App.css';
import CopyCommand from './CopyCommand';
import PasteCommand from './PasteCommand';
import CutCommand from './CutCommand';
import UndoCommand from './UndoCommand';

function App() {
  const ref = useRef(null);
  const [history, setHistory] = useState([])
  const [clipboard, setClipboard] = useState([])
  let application = null

  const getApplication = () => {
    if (application) return application
    else application = {
      textarea: ref?.current,
      pushClipboard(text) {
        setClipboard((prev) => [text, ...prev.slice(0, 9)])
      },
      popClipboard() {
        if (clipboard.length === 0) return null;
        const clip = clipboard[0]
        setClipboard((prev) => prev.slice(1, prev.length))
        return clip
      },
      pushHistory(command) {
        console.log(command)
        setHistory((prev) => [command, ...prev.slice(0, 9)])
      },
      undo() {
        if (history.length === 0) return null;
        const command = history[0]
        command.undo()
        setHistory((prev) => prev.slice(1, prev.length))
      }
    }
    return application
  }

  const copyCommand = () => {
    let app = getApplication()
    let command = new CopyCommand(app)
    command.execute();
  }

  const pasteCommand = () => {
    let app = getApplication()
    let command = new PasteCommand(app)
    let ok = command.execute();
    if (ok) app.pushHistory(command)
  }

  const cutCommand = () => {
    let app = getApplication()
    let command = new CutCommand(app)
    let ok = command.execute();
    if (ok) app.pushHistory(command)
  }

  const undoCommand = () => {
    let app = getApplication()
    let command = new UndoCommand(app)
    command.execute();
  }

  return (
    <div className="App">
      <div>
        <div>
          <button onClick={copyCommand}>복사</button>
          <button onClick={pasteCommand}>붙여넣기</button>
          <button onClick={cutCommand}>잘라내기</button>
          <button onClick={undoCommand}>되돌리기</button>
        </div>
        <textarea ref={ref} />
        <ul>
          {clipboard.map((text, i) => <li key={i}>{text}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
