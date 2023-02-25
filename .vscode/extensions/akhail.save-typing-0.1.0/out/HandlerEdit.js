"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class HandlerEdit {
    saveDoc(editor) {
        if (!this.isEnabled())
            return;
        editor.document.save();
    }
    isEnabled() {
        let languageId = vscode.window.activeTextEditor.document.languageId;
        let config = vscode.workspace.getConfiguration('save-typing');
        let languages = config.get('languages', ["*"]);
        if (languages.indexOf("*") === -1 && languages.lastIndexOf(languageId) === -1) {
            return false;
        }
        else {
            return true;
        }
    }
    run() {
        vscode.workspace.onDidChangeTextDocument(event => this.saveDoc(event));
    }
}
exports.HandlerEdit = HandlerEdit;
//# sourceMappingURL=HandlerEdit.js.map