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
        
		
        function findImageTags(active_window){
			/* Finds all of the html img tags */
            if (active_window) {
			  text = active_window.document.getText().match(/<img[\S\s]*?>/g)
         	  return text||[]
          	}	 else {
        	  vscode.window.showInformationMessage('No active editor is open.');
			  return []
        	}
		}
		
		function replaceAlts(image_elements_array){
           image_elements_array.forEach((element,index) => {
			    
			if(element.includes(" alt=")||element.includes(" alt ="))
			{
                image_elements_array[index] = element.replace(/\salt\s?=\s?["'].*["']/, ' alt = "no source"')
			}
			else
			{
			   image_elements_array[index] = element.replace(/\/?>/, ' alt = "no source">')
			}
				
		   });
		   
               return image_elements_array
		}

		const current_active_window = vscode.window.activeTextEditor;
		let original_text = findImageTags(current_active_window);
		original_text = replaceAlts(original_text);
		
		
	
        
 
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
