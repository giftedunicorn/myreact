import React from "../myreact/react";
import ReactDOM from "../myreact/react-dom";
import App from "./calculator/component/App";
import "./calculator/index.css";
// import App from "./emoji/App";
// import "./emoji/index.css";
import "github-fork-ribbon-css/gh-fork-ribbon.css";

ReactDOM.render(
	<App />, 
	document.getElementById("root")
);