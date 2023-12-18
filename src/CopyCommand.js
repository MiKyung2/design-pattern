import Command from './Command'

class CopyCommand extends Command {
    execute() {
        const { value, selectionStart, selectionEnd } = this.application.textarea;
        if (selectionStart === selectionEnd) return;
        this.saveBackup()
        this.application.pushClipboard(value.slice(selectionStart, selectionEnd))
        return true;
    }
}

export default CopyCommand;