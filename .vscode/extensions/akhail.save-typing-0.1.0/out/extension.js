'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerEdit_1 = require("./HandlerEdit");
function activate(context) {
    let handlerEdit = new HandlerEdit_1.HandlerEdit();
    handlerEdit.run();
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map