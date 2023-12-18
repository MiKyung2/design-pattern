class Command {
    application
    backup

    constructor (application) {
        this.application = application
    }

    saveBackup() {
        this.backup = this.application.textarea.value
    }
        
    undo() {
        if (!this.backup) return;
        this.application.textarea.value = this.backup
    }
        
    execute() { throw new Error('Not implemented.') }
}

export default Command