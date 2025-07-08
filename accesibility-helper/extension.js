// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

//To-Do: Handle if the link has a <> characters
//To-Do: Regex into variables
function activate(context) {

	console.log('Congratulations, your extension "accesibility-helper" is now active!');

	
	const disposable = vscode.commands.registerCommand('accesibility-helper.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
        
		
        function findImageTags(active_window){
			/* Finds all of the html img tags */
			//To-Do: Clean this function for SOLID code
            if (active_window) {
			  text = active_window.document.getText().match(/<img[\S\s]*?>/g)
         	  return text||[]
          	}	 else {
        	  vscode.window.showInformationMessage('No active editor is open.');
			  return []
        	}
		}

		function replaceAlts(image_elements_array,edited_text){
           image_elements_array.forEach((element,index) => {
			    
			if(element.includes(" alt=")||element.includes(" alt ="))
			{
                edited_text.append(element.replace(/\salt\s?=\s?["'].*["']/, ' alt = "no source"'))
			}
			else
			{
			   edited_text.append(element.replace(/\/?>/, ' alt = "no source">'))
			}
				
		   });
		   
               return edited_text
		}

		function addEditstoOriginalText(og_text,og_fragments,edited_fragments){
			og_fragments.forEach((element,index)=>{
				
				og_text = og_text.replace(element,edited_fragments[index])

			})
             
		}
        
		function replaceDocument(active_window){
			const lastLine = active_window.document.lineCount-1
            const start = vscode.Position(0,0)
			const end = vscode.Position(lastLine,active_window.document.lineAt(lastLine).getText().length())
			const range = vscode.Range(start,end)
			current_active_window.document.replace(range,edited_text)
		}   

		const current_active_window = vscode.window.activeTextEditor;
		let og_text = current_active_window.document.getText()
		const og_text_img_tags =findImageTags(current_active_window);
		let edited_text;
		replaceAlts(og_text_img_tags,edited_text);
		addEditstoOriginalText(og_text,og_text_img_tags,edited_text)

		
		
	
        
 
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
