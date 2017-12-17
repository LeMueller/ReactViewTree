import React, { Component } from 'react';
import PropTypes from 'prop-types';

const dataForm = {
  "root": [
    {"Id": "A", "children":[]},
    {"Id": "B", "children":[
      {"Id": "BA", "children":[]},
      {"Id": "BB", "children":[
        {"Id": "BBA", "children":[]},
        {"Id": "BBB", "children":[]}
      ]}
    ]}
  ]
}


export default class TreeNode extends Component {
  constructor(props){
    super(props);

    // this.addNodeToState = this.addNodeToState.bind(this);
    this.convertDataToNode = this.convertDataToNode.bind(this);
    this.renderNodes = this.renderNodes.bind(this);
  }
  state = {
    node: [],
    targetId: '',
  }


  // addNodeToState(data){
  //   this.convertDataToNode(data);
  //   this.setState({
  //     node: nodeArr,
  //   });
  // }

  convertDataToNode(data){
    console.log(data);
    if(!data){
      return
    }
    data.map((dataItem) => {
      const node = "<node id= " + dataItem.Id + "/>";
      this.setState({
        node: this.state.node.push(node),
      })
      console.log('node in convert');
      console.log(this.state);
      if(dataItem.children.length > 0){
        this.convertDataToNode(dataItem.children);
      }
    });
  }

  renderNodes(){
    console.log("note in render");
    console.log(this.state);
    return (
      this.state.node.map((node) => {
        <div id = {node.Id}>{node.Id}</div>
      })
    )
  }

  componentDidMount(){

    this.convertDataToNode(dataForm.root);
    console.log('did mount');
    console.log(this.state);
  }

  render(){
    console.log('treeViewer render');
    console.log(this.state);
    return this.renderNodes();
  }

}

TreeNode.propsTypes = {
  data: PropTypes.object,
}
