const vscode = require('vscode')
const fs = require('fs')
var listOfRandomNumbers = []

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'data-test-id-generator.addTestDataAttributes',
    () => {
      addTestDataAttributes()
    }
  )

  context.subscriptions.push(disposable)

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'data-test-id-generator.addTestDataAttributesKeybinding',
      () => {
        addTestDataAttributes()
      }
    )
  )
}

function addTestDataAttributes() {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const document = editor.document
    const text = document.getText()

    const extensionPath = vscode.extensions.getExtension(
      'hanigerges.data-test-id-generator'
    ).extensionPath

    // Get the user-configured configPath or use the default value
    const configPath = vscode.workspace.workspaceFolders[0].uri.fsPath.concat(
      '/.datatestidrc.json'
    )

    console.log('Extension Path:', extensionPath)
    console.log('Config Path:', configPath)

    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8')
      const config = JSON.parse(configData)

      const attributeKeyword = config.attributeKeyword || 'data-test'

      let modifiedText = text.replace(
        /<([-\w]+)([^>]*)\/?>/g,
        (match, elementName, attributes) => {
          console.log('Element Name:', elementName)

          // Skip adding test ID if the element is in the ignore list
          if (config.ignoreElements.includes(elementName)) {
            return match
          }

          var randomNumber = Math.floor(Math.random() * 10000) + 1
          listOfRandomNumbers.push(randomNumber)

          while (listOfRandomNumbers.includes(randomNumber)) {
            randomNumber = Math.floor(Math.random() * 100000) + 1
          }
          const existingAttributes = attributes.trim()
          const testId = existingAttributes.includes('id=')
            ? getIdFromElement(existingAttributes)
            : elementName + '-' + config.defaultTestId + '-' + randomNumber

          console.log('Existing Attributes:', existingAttributes)
          console.log('Test ID:', testId)

          if (existingAttributes.includes(attributeKeyword))
            return `<${elementName} ${existingAttributes}>`

          return `<${elementName} ${attributeKeyword}="${testId}" ${existingAttributes}>`
        }
      )

      editor.edit(editBuilder => {
        const entireDocument = new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        )
        editBuilder.replace(entireDocument, modifiedText)
      })
    } else {
      vscode.window.showErrorMessage(
        'Config or ignoreElements file not found. Create ".datatestidrc.json" file in your extension project.'
      )
    }
  } else {
    vscode.window.showErrorMessage('No active text editor found.')
  }
}

function getIdFromElement(attributes) {
  const idMatch = attributes.match(/\bid=["'](.*?)["']/)
  return idMatch ? idMatch[1] : null
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
