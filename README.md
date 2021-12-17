# HOW TO CREATE A REACT

### https://segmentfault.com/a/1190000020034137
### https://github.com/hujiulong/blog/issues/4

## Prepare works
1. install parcel as the bundling tool 
2. create index.js and index.html
3. create .babelrc config file for jsx to js converting
4. `parcel index.html` to run this little app

## Basic react function
1. get jsx and convert to virtual dom with createElement
2. render virtual dom on the real dom

## render components
1. update render function, render can handle react function components and class components
2. add createComponent, setComponentProps, and createComponent to handle components
3. implement react life cycle functions in createComponent, setComponentProps and createComponen
4. now react will replace all DOM when updating, it's expensive

## react diff
1. Create diff function. Diff can find the changes in virtual dom and only updates the real dom with the difference for better performance.
2. Compare between the real dom and the virtual dom. React will compare the new virtual dom and old virtual dom, find changes and update the real dom with the patches.
3. compare and update at same time

## react setState optimization
1. Update setState function.
2. Push all stateChange and component to queue. Push the component to render queue only once. Remove dups.
3. Create flush function to execute stateChange in queue and render component
4. Run flush function after all sync function. Defer flush with promise or setTimeout(0)

# HOW TO CREATE REACT FIBER

### https://segmentfault.com/a/1190000022995622

* create my react 16 for learning hook, fiber, useState, reconciliation, performUnitOfWork and new features

# WEBPACK

1. build myreact with webpack
2. optimize webpack config

* babel/core: The core babel library

* babel/preset-env: Is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)This is also known as browser polyfills

* babel/preset-react: Transform React JSX into regular JavaScript code

* babel-loader: Webpack loader helper

* CSS-loader: Handle CSS files

* style-loader: The style-loader takes CSS and actually inserts it into the page so that the styles are active on the page.

* postcss-loader: Will process CSS to work on older browsers

* URL-loader: Will load the image files. Url loader depends on file-loader

* autoprefixer: Autoprefixer is a PostCSS plugin which parses your CSS and adds vendor prefixes

* html-webpack-plugin: The HtmlWebpackPlugin simplifies the creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.

* clean-webpack-plugin: clean bundle folder befoer build new folder

* mini-css-extract-plugin: extract css code from bundle.js as seperate style file and inject into index.html


# WEBPACK OPTIMIZATION

* happypack and thread-loader: run bundle job in worker pool. Now we should use thread-loader since happypack is inactive.

* lazy loading: the print.js file will be lazy-loading. Only load the splited print.js bundle when = button is clicked. 

* tree shaking: prune code if unused.

* cache: add [contenthash] to the output file. it helps the web server and browser caching.

* code splitting: Split code for multiple entry. Extract common dependencies into an existing entry chunk or an entirely new chunk
