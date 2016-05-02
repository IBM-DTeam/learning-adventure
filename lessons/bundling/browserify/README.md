# BROWSERIFY SETUP

This project will show you how to setup browserify bundling, that is, it will put all your react code in a javascript file that can be read by the browser.

It allows you to do client side require(), just like node.

To get browserify to running with react here is a tutorial

The folder structure first

```sh
.
+-- client
|   +-- components
|       +-- app.js
|   +-- css
|       +-- default.css
|   +-- dist
|       +-- bundle.js
|   +-- index.html
|   +-- main.js
|   +-- package.json
```

 ```sh
npm install --save react react-dom babelify babel-preset-es2015 babel-preset-react
 ```

Then you got to install watchify for bundling and browser-sync for live reload

 ```sh
 npm install -g watchify browser-sync
 ```

This is what your app.js should look like

```jsx
var React = require('react');

var App = React.createClass({
render:function() {
  return <div>Hello World, make some change and save this file, do the same with the css file</div>
}
})
module.exports = App;

```

Here is what the main.js would look like for your web app

```jsx
var React = require('react');
var ReactDOM = require('react-dom');
var App =  require('./components/app.js')
ReactDOM.render(<App/>,document.getElementById('content'))
```

And this is the index.html
```html
<html>
<head>
    <link href="./css/default.css" rel="stylesheet"/>
</head>
<body>
  <div id="content"></div>
  <script type="text/javascript" src="./dist/bundle.js"></script>
</body>
</html>
```

These commands are the heart of your project, cd into the client folder and run these commands in 2 separate command prompts.
Bundling :-

```sh
watchify -t [ babelify --presets [ es2015 react ] ] main.js -o ./dist/bundle.js -v
```

In another command prompt

Live reload :-

```sh
browser-sync start --server --files "./dist/bundle.js , ./css/*.css"
```

Look at the package.json to see how you can make these commands npm scripts

