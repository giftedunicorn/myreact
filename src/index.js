// src/index.js
import React from './react'
import ReactDOM from './react-dom'

class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Welcome name="Sara" />
                <Welcome name="Cahal" />
                <Welcome name="Edite" />
                <div>
                    <div>home</div>
                    <div>hello world!</div>
                    <h2>It is {new Date().toLocaleTimeString()}.</h2>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

/*
    ReactDOM.render -> _render -> createComponent -> setComponentProps -> renderComponent
    setState -> renderComponent
*/
