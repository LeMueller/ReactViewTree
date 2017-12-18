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

    this.state = {
      nodes: [],
      targetId: '',
    }

    this.dataController = {
      "root": [
        {"id": "A", "children":[]},
        {"id": "B", "children":[
          {"id": "BA", "children":[]},
          {"id": "BB", "children":[
            {"id": "BBA", "children":[]},
            {"id": "BBB", "children":[]}
          ]}
        ]}
      ]
    };

    // this.convertDataToHtml = this.convertDataToHtml.bind(this);
  }

  // convertDataToHtml(data){
  //   console.log(this.dataController);
  //   console.log('dataController');
  //   if(!data){
  //     return
  //   }
  //   data.map((dataItem) => {
  //     console.log(dataItem);
  //     return <div id={dataItem.Id}>{dataItem.Id}</div>
  //     if(dataItem.children.length > 0){
  //       this.convertDataToHtml(dataItem.children);
  //     }
  //   });
  // }
  updateState(newState){
    this.setState({
      nodes: this.dataController.root,
    })
  }

  renderNodes(nodes){
    return nodes.map(node => this.renderNode(node));
  }

  renderNode(node) {
    const { id, children = [] } = node;

    return (
      <div key = {node.id}>
        <div className="label">{id}</div>
        {this.maybeRenderChidlren(children)}
      </div>
    )
  }

  maybeRenderChidlren(children) {
    if (children.length == 0) {
      return false;
    }

    return (
      <div className="children">{this.renderNodes(children)}</div>
    );
  }

  componentWillMount(){
    this.updateState();
  }

  render(){
    return(
      <div>
        {this.renderNodes(this.state.nodes)}
      </div>
    )
  }

}

TreeNode.propsTypes = {
  data: PropTypes.object,
}
