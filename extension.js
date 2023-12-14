const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

async function activate(context) {
    
	let searchByMenu = vscode.commands.registerCommand('stackoverflow-search.searchStackOverflowByContextMenu',
	async function () {
		let editor = vscode.window.activeTextEditor;
		
		const selection = editor.selection;
        if (editor.selection) {
		    if (selection && !selection.isEmpty) {
			    const selectionRange = new vscode.Range(selection.start.line, selection.start.character,
				    selection.end.line, selection.end.character);
			    let highlited = editor.document.getText(selectionRange);
			    vscode.env.openExternal("https://stackoverflow.com/search?q=" + highlited);
		    }
	    }
	});

    let searchByPalette = vscode.commands.registerCommand('stackoverflow-search.searchStackOverflowByPalette',
	async function () {
        let searchQuery = await vscode.window.showInputBox({
            placeHolder: "Search query",
            prompt: "Search on StackOverlflow",
        });

        if (searchQuery != undefined) {
            if (searchQuery == '') {
                vscode.window.showErrorMessage('You need to input some text');
            } else {
                searchQuery = encodeURIComponent(searchQuery);
                //searchQuery.replaceAll(/\s/g, '+');
                //const tags = vscode.window.activeTextEditor?.document.languageId;
                vscode.env.openExternal("https://stackoverflow.com/search?q=" + searchQuery);
            }
        }
	});

    context.subscriptions.push(searchByMenu);
    context.subscriptions.push(searchByPalette);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
