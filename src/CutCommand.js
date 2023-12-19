import Command from './Command'

class CutCommand extends Command {
  execute() {
    const { value, selectionStart, selectionEnd } = this.application.textarea;
    if (selectionStart === selectionEnd) return;
    this.saveBackup()
    this.application.pushClipboard(value.slice(selectionStart, selectionEnd))
    this.application.textarea.value = value.slice(0, selectionStart) + value.slice(selectionEnd, value.length)
    return true;
  }
}

export default CutCommand;