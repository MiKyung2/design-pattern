import { useReducer, useRef, useState } from 'react';
import './App.css';
import CopyCommand from './CopyCommand';
import PasteCommand from './PasteCommand';
import CutCommand from './CutCommand';
import UndoCommand from './UndoCommand';

function reducer(state, action) {
  switch(action.type) {
    case 'PUSH':
      return [action.text, ...state.slice(0, 9)];
    case 'POP':
      return state.slice(1, state.length)
  }
}

function App() {
  const ref = useRef(null);
  const [history, setHistory] = useState([])
  let application = null

  const [clipboard, dispatch] = useReducer(reducer, []);

  const getApplication = () => {
    if (application) return application
    else application = {
      textarea: ref?.current,
      pushClipboard(text) {
        dispatch({
          type: 'PUSH',
          text
        })
      },
      popClipboard() {
        if (clipboard.length === 0) return null;
        const clip = clipboard[0];
        dispatch({
          type: 'POP'
        })
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

  const handleClickCopy = () => {
    let app = getApplication()
    let command = new CopyCommand(app)
    command.execute();
  }

  const handleClickPaste = () => {
    let app = getApplication()
    let command = new PasteCommand(app)
    let ok = command.execute();
    if (ok) app.pushHistory(command)
  }

  const handleClickCut = () => {
    let app = getApplication()
    let command = new CutCommand(app)
    let ok = command.execute();
    if (ok) app.pushHistory(command)
  }

  const handleClickUndo = () => {
    let app = getApplication()
    let command = new UndoCommand(app)
    command.execute();
  }

  return (
    <div className="App">
      <div>
        <div>
          <button handleClick={handleClickCopy}>복사</button>
          <button handleClick={handleClickPaste}>붙여넣기</button>
          <button handleClick={handleClickCut}>잘라내기</button>
          <button handleClick={handleClickUndo}>되돌리기</button>
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
