import Command from './Command'

class UndoCommand extends Command {
  execute() {
    this.application.undo();
    return true;
  }
}

export default UndoCommand;