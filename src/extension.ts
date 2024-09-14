import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const calc = vscode.commands.registerCommand('inline-calculate.calc', () => {
		const selection = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.selection : undefined;
		const selectedText = vscode.window.activeTextEditor?.document.getText(selection) || '';

		let result = calculateExpression(selectedText);

		if (result === "Invalid expression") {
			vscode.window.showInformationMessage('計算できませんでした');
		} else if (selection != undefined) {
			vscode.window.activeTextEditor?.edit(editBuilder => {
				editBuilder.replace(selection, result);
			});
		}
	});

	context.subscriptions.push(calc);

	const calcP = vscode.commands.registerCommand('inline-calculate.calcpercent', () => {
		const selection = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.selection : undefined;
		const selectedText = vscode.window.activeTextEditor?.document.getText(selection) || '';

		let result = calculateExpression(selectedText);

		if (result === "Invalid expression") {
			vscode.window.showInformationMessage('計算できませんでした');
		} else if (selection != undefined) {
			vscode.window.activeTextEditor?.edit(editBuilder => {
				editBuilder.replace(selection, result * 100 + '%');
			});
		}
	});

	context.subscriptions.push(calcP);

}

function calculateExpression(expression: any) {
  try {
    return eval(expression);
  } catch (error) {
    return "Invalid expression";
  }
}