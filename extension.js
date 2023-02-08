// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const convert = require('./convert');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const convertCommand = vscode.commands.registerCommand(
    'extension.convertCSStoJS',
    () => {
      const editor = vscode.window.activeTextEditor;

      // return if there's no editor or it's not a javascript file
      if (
        !editor ||
        !/javascript|typescript/.test(editor.document.languageId)
      ) {
        return;
      }

      const selection = editor.selection;
      const lineText = editor.document.lineAt(selection.start.line).text;
      const selectedText = editor.document.getText(selection);
      const convertableText = selectedText || lineText;
      const cssObject = convert(convertableText);

      return editor.edit((builder) => {
        builder.replace(selection, cssObject);
      });
    }
  );

  context.subscriptions.push(convertCommand);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
