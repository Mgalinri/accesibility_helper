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
                edited_text.push(element.replace(/\salt\s?=\s?["'].*["']/, ' alt = "no source"'))
			}
			else
			{
			    edited_text.push(element.replace(/\/?>/, ' alt = "no source">'))
			}
				
		   });
		   
               return edited_text
		}

		function addEditstoOriginalText(og_text,og_fragments,edited_fragments){
			og_fragments.forEach((element,index)=>{
				
				og_text = og_text.replace(element,edited_fragments[index])

			})
           return og_text;
		}
        
		function extractSrcTag(og_fragments){
			const srctags = []
			og_fragments.forEach((element)=>{
				//
				srctags.push(element.match(/\bsrc\s?=\s?['"][\s\S]*?['"]/)[0])
			})
			return srctags;
		}

		function extractSrcTagValue(src_tags){
			const links = []
			src_tags.forEach((element)=>{
                links.push(element.match(/["'](.*)?["']/)[1])
			})
			return links;
		}
        
		async function fetchApi(link) {
			console.log(link)
			const caption = await fetch('http://localhost:8000/caption/url',{
				"method": "POST",
				"headers":{
				"Content-Type": "application/json"},
				"body": JSON.stringify(
					{"image_path":link}
				)
			})
			const data = await caption.text();
			return data;
		}
		async function generateCaptions(og_fragments){
			const src_tags = extractSrcTag(og_fragments);
			const links_arrays = extractSrcTagValue(src_tags);

            const captions = []
			links_arrays.forEach(async (element)=>{
				//Pass each element through the api
				//Check if the link is empty
				console.log(element)
				captions.push(await fetchApi('https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630'))

			})
           return captions
			
		}

		async function replaceDocument(active_window,changed_text){
			const lastLine = active_window.document.lineCount-1
			const lastCharacter = active_window.document.lineAt(lastLine).text.length-1
            const start = new vscode.Position(0,0)
			const end = new vscode.Position(lastLine,lastCharacter)
			const range = new vscode.Range(start,end)
			const edit = await active_window.edit((editBuilder)=>{
				
				    editBuilder.replace(range,changed_text)
				 
				
			
			})
			
			await edit
			
		}   

		const current_active_window = vscode.window.activeTextEditor;
		let og_text = current_active_window.document.getText()
		const og_text_img_tags =findImageTags(current_active_window);
		let edited_text = [];
		replaceAlts(og_text_img_tags,edited_text);
        let new_text=addEditstoOriginalText(og_text,og_text_img_tags,edited_text)
		let captions;
		generateCaptions(og_text_img_tags).then((data)=>{
			console.log(data)
			
		})
		replaceDocument(current_active_window,new_text)

		
		
	
        
 
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
