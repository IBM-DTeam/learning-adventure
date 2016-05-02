#Webpack Tutorial

This tutorial will show you how to bundle a project using [Webpack]. 

######Used in: [PATrick]
######Prerequisites: [Node.js] installed

##Setting up a Project to use Webpack and [React.js]

1. Create a new folder to contain your project files.
2. Navigate to this folder in the command line and run `npm init` to create a new Node project. In the fields that follow, enter the information about your project.
3. Run `npm install babel webpack webpack-dev-server -g`. 
4. To use React with our project, run `npm install react react-dom --save`.
5. Install babel preloaders by running `npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save`.
6. Create the following files in your project folder: index.html, App.js, main.js, webpack.config.js
7. In your webpack.config.js file, add the following: 
   ``` javascript
  module.exports = {
    entry: './main.js',
    output: {
      path: './',
      filename: 'index.js'
    },
    devtool: 'source-map',
    devServer: {
      inline: true,
      port: 8000,
      historyApiFallback: true
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }
  }
  ```

8. In your index.html file, add the following:
   ``` html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Project name</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="index.js"></script>
    </body>
  </html>
  ```

9. In your App.js file, add the following:
   ```jsx
   var React = require('react');
   
   var App = React.createClass({
      render: function() {
        return <div>My app</div>
      }
   });
   
   module.exports = App;
   ```
   
10. Then in your main.js file, add the following:
   ```jsx
   var React = require('react');
   var ReactDOM = require('react-dom');
   var App = require('./App');
   
   ReactDOM.render(<App />, document.getElementById("app"));
   ```
   
11. In package.json, in the "scripts" object, remove the line with the `"test"` key, and replace it with a `"start"` key, and this value: `webpack-dev-server`. So your `"scripts"` object should now look like:
   ``` javascript
  "scripts": {
    "start": "webpack-dev-server"
  }
  ```
12. Then to run your project, run `npm start` in the command line. Wait until you see the line `webpack: bundle is now VALID.`.
13. When webpack has finished bundling your project, navigate to the port specified in your webpack.config.js file, or in this case, port 8000. (http://localhost:8000). You should be able to see `My app` in your browser.

[//]: #
  [Node.js]: <https://nodejs.org/en/>
  [PATrick]: <https://github.ibm.com/dteam/PATRICK>
  [React.js]: <https://facebook.github.io/react/>
  [Webpack]: <https://webpack.github.io/>
