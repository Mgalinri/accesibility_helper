// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
//To-Do: Handle if the link has a <> character
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "accesibility-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('accesibility-helper.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
        const current_active_window = vscode.window.activeTextEditor;
		 if (current_active_window) {
        const original_text = current_active_window.document.getText().match(/<img[\S\s]*?>/g);
        	console.log("🖼️ Found images:", original_text[0]); // <--- set a breakpoint here
       } else {
        console.log("❌ No active editor");
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
