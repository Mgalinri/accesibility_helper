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

		async function replaceAlts(image_elements_array,edited_text){

            const captions = await generateCaptions(image_elements_array)
			image_elements_array.forEach((element,index) => {
			    
			if(element.includes(" alt=")||element.includes(" alt ="))
			{
                edited_text.push(element.replace(/\salt\s?=\s?["'].*["']/, ' alt ="'+captions[index]+' "'))
			}
			else
			{
			    edited_text.push(element.replace(/\/?>/, ' alt = "'+captions[index]+' ">'))
			}
				
		   });
		   
               return edited_text
		}

		async function addEditstoOriginalText(og_doc,og_fragments,edited_fragments){
			for (let i=0;i<og_fragments.length;i++)
			{
				
				og_doc = og_doc.replace(og_fragments[i],await edited_fragments[i])

			}
           return og_doc;
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
			try{
			const caption = await fetch('http://localhost:8000/caption/url',{
				"method": "POST",
				"headers":{
				"Content-Type": "application/json"},
				"body": JSON.stringify(
					{"image_path":""+link+""}
				)
			})
			const data = await caption.json();
			if(caption.status !== 200){
				return "No source";
			}
			
			return data.caption}
			catch(error){
				console.log(error)
				return "No source";
			}
		}
		async function generateCaptions(og_fragments){
			const src_tags = extractSrcTag(og_fragments);
			const links_arrays = extractSrcTagValue(src_tags);

            const captions = []
			for (const element of links_arrays){
				//Pass each element through the api
				//Check if the link is empty
			  if(element !== undefined)	{
				const data = await fetchApi(element)
				captions.push(data)
			  }
			  else{
				captions.push("No source")
			  }}

			
           return await captions
			
		}

		async function replaceDocument(active_window,changed_text){
			const lastLine = active_window.document.lineCount-1
			const lastCharacter = active_window.document.lineAt(lastLine).text.length
            const start = new vscode.Position(0,0)
			const end = new vscode.Position(lastLine,lastCharacter)
			const range = new vscode.Range(start,end)
			await active_window.edit((editBuilder)=>{
				
				    editBuilder.replace(range, changed_text)
				 
				
			
			})
			
			
		}   

		const current_active_window = vscode.window.activeTextEditor;
		let og_text = current_active_window.document.getText()
		const og_text_img_tags =findImageTags(current_active_window);
		let edited_text = [];
		replaceAlts(og_text_img_tags,edited_text)
		.then((edited_text)=>{
			return addEditstoOriginalText(og_text,og_text_img_tags,edited_text)})
		.then( async (e)=>{
		    const edits = await e;
		    replaceDocument(current_active_window,edits)})
		

		
		
	
        
 
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
