import Command from './Command'

class PasteCommand extends Command {
  execute() {
    const { value, selectionStart, selectionEnd } = this.application.textarea;
    const clip = this.application.popClipboard();
    if (clip === null) return;
    this.saveBackup();

    this.application.textarea.value = value.slice(0, selectionStart) + clip + value.slice(selectionEnd, value.length)
    return true;
  }
}

export default PasteCommand;