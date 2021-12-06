# HOW TO CREATE A REACT

### https://segmentfault.com/a/1190000020034137
### https://github.com/hujiulong/blog/issues/4

# Prepare works
1. install parcel as the bundling tool 
2. create index.js and index.html
3. create .babelrc config file for jsx to js converting
4. `parcel index.html` to run this little app

# Basic react function
1. get jsx and convert to virtual dom with createElement
2. render virtual dom on the real dom

# render components
1. update render function, render can handle react function components and class components
2. add createComponent, setComponentProps, and createComponent to handle components
3. implement react life cycle functions in createComponent, setComponentProps and createComponen
4. now react will replace all DOM when updating, it's expensive

# react diff
1. Create diff function. Diff can find the changes in virtual dom and only updates the real dom with the difference for better performance.
2. Compare between the real dom and the virtual dom. React will compare the new virtual dom and old virtual dom, find changes and update the real dom with the patches.
3. compare and update at same time

# react setState optimization
1. Update setState function.
2. Push all stateChange and component to queue. Push the component to render queue only once. Remove dups.
3. Create flush function to execute stateChange in queue and render component
4. Run flush function after all sync function. Defer flush with promise or setTimeout(0)
