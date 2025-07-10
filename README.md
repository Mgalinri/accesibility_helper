# Accesibility helper
The following project is a visual studio code extension that auto-generates `alt`
attributes to improve webpages/web apps SEO and accesibility features.
>**Warning** This extension is currently under development.

## Running Locally
- Make sure you are running node-js and yo before running the project
```
git clone 
cd accesibility-helper
```
1. Open the extension.js file
2.  Run the debuger `fn+f5`
3.  Then on the command palette `Ctrl+Shift+P`, run Hello World


## Features
1. The extension identifies `img` tags using the VSCode API.
2. It auto-generates captions for the images using BLIP with the API from the Caption Generator project
3. Adds a "no-source" alt attribute to imgages without a `src` property.

## Know issues
- Does not support local files

## Requirements
VS Code version >= 1.101.2

## License
Licensed under the MIT license

