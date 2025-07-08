// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

//To-Do: Handle if the link has a <> characters
function activate(context) {

	console.log('Congratulations, your extension "accesibility-helper" is now active!');

	
	const disposable = vscode.commands.registerCommand('accesibility-helper.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
        const current_active_window = vscode.window.activeTextEditor;
		
    
		const original_text;
		 if (current_active_window) {
         	original_text = current_active_window.document.getText().match(/<img[\S\s]*?>/g); // <--- set a breakpoint here
          } else {
        	vscode.window.showInformationMessage('No active editor is open.');
           }
		
	
        
    // Find all <img ... /> tags in the current active window's document
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from accesibility_helper!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
