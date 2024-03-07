# Data Test ID Generator

![Data Test ID Generator](assets/coffee.jpg)

## Overview

The Data Test ID Generator is a Visual Studio Code extension designed to simplify the process of adding test identifiers (data-test attributes) to HTML elements in web development projects. If your codebase lacks test IDs and you find yourself spending valuable time manually adding them, this extension is here to be your time-saving ally.

## Key Features

- Effortlessly assign data test IDs to HTML elements with a simple keyboard shortcut.
- Customize the data test ID attribute keyword via a user-configurable .datatestidrc.json file.
- Intelligent generation of data test IDs from existing element IDs for a seamless testing experience.
- Support for various file types, including HTML, Vue, and JSX.

## Demo Preview

<img src="./assets/sample.gif" />

## Getting Started

### Installation

- [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=hanigerges.data-test-id-generator)

#### Via Visual Studio Code

Launch _Quick Open_:

- <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl+P`
- <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘P`
- <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl+P`

Paste the following command and press `Enter`.:

```shell
ext install test-id-generator
```

### Usage

By default Shift + Alt + T (Cmd + Shift + T for Mac) key combination inserts data test id to all the html elements.

It checks the element for the id first. If the element has it, it copies it to the data test id. If the element has not, it generates the test id by adding elementName to the `defaultTestId` from the config.

The `attributeKeyword` is for data test id attribute (`data-test`, `data-test-id`, `test-id` ...)

The `ignoreElements` is for not adding data test id to all the html elements. (`<template>`, `<script>`, `<style>` ...)

#### Config

```javascript
// .datatestidrc.json
{
  "attributeKeyword": "data-test-id",
  "ignoreElements": [
    "template",
    "script",
    "style",
    "body",
    "head",
    "html",
    "header",
    "footer",
    "meta",
    "title",
    "link"
  ],
  "defaultTestId": "test"
}
```

## Contribution

I believe in the power of collaboration! This project is open to contributions from the community. If you're passionate about testing in web development and want to contribute, check out the project on [GitHub](https://github.com/HaniGerges/vscode-data-test-id-generator), and let's build something amazing together! 🤝✨

## License

This project is licensed under the [MIT License](http://opensource.org/licenses/MIT).
