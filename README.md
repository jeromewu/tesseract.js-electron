Tesseract.js Electron
=====================

An example to use tesseract.js in electron.

1. Loading image in `index.html` and passing the `path` to `main.js`.

2. `main.js` recognize the image and returns the result.

3. Then `index.html` displays the result.

# run the example
```bash
# install
$ npm install

# run
$ npm run start
```

# init script (no need to run for example)
```bash
# There is no need for a specific version, just make a record.
# Please try other versions by yourself.

$ node --version
# v16.16.0

$ npm --version
# 9.6.2

# init project
$ npm init -f

# install
$ npm install electron tesseract.js --save-dev
```
