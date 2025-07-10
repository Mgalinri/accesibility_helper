# Accesibility helper
The following project is a visual studio code extension that auto-generates alt
attributes to improve webpages/web apps SEO and accesibility features.
This has not been published yet.

# Running Locally
- Make sure you are running node-js and yo before running the project
```
git clone 
cd accesibility-helper
```
Access the extension js file and run the debuger `fn+f5` and then on the command palette `Ctrl+Shift+P`
run Hello World

# Features
1. The extension identifies the source for the images using the VSCode API.
2. It auto-generates captions for the images using a BLIP Api.
3. Adds a no-source alt to imgages without a src property.

# Know issues
1. The extension does not work with local files, and relative paths.

# Requirements
VS Code version >= 1.101.2

Licensed under the MIT license

