import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TreeView from './TreeView';
import ReactUiTree from './ReactUiTree';
// import Tree from 'react-ui-tree'
// import tree from './tree';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Test of <code>react-treebeard</code> React.
        </p>
        <TreeView />
        {/* <ReactUiTree/> */}
      </div>
    );
  }
}

export default App;
