import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import './tree-view.less';

export default class TreeView extends React.Component {
  constructor(props){
    super(props);
    this.nodeClick = this.nodeClick.bind(this);
  }

  render(){
    // get the root nodes
    const root = this.state ? this.state.root : null;

    //roots were not retrieved ?
    if (!root) {
      const self = this;
      //this.loadNodes(null)
      this.loadNodes(null)
      .then(res => self.setState({ root: res }));
      return null;
    }
    return <div className = "tree-view"> {this.createNodesView(root)} </div>
  }

  loadNodes(parent) {
    const func = this.props.onGetNodes;

    if (!func) {
      return null;
    }

    const pitem = parent ? parent.item : undefinded;
    let res = func(pitem);

    // is noat a promis ?
    if (!res || res.then) {
      // force node resolution by promises
      res = Promise.resolve(res);
    }

    // create nodes wrapper when nodes are resolved
    const self = this;
    return res.then(items => {
      if (!items) {
        return [];
      }

      const nodes = self.createNodes(items);
      return nodes;
    })
  }

  createNodes(items) {
    const funcInfo = this.props.checkLeaf;
    return items.map(item => {
      const leaf = funcInfo ? funcInfo(item) : false;
      return { item: item, state: 'collapsed', children: null, leaf: leaf };
    })
  }

  createNodesView() {
    const self = this;

    // recursive function to create the expanded tree in a
    const mountList = function (nlist, level, parentkey) {
      let count = 0;
      const lst = [];

      nlist.forEach(node => {
        const key = (parentkey ? parentkey + '.' : '') + count;
        const row = self.createNodeRow(node, level, key);

        lst.push(row);
        if(node.state !== 'collapsed' && !node.leaf && node.children) {
          lst.push(mountList(node.children, level + 1, key));
        }
        count++;
      });

      // the children div key
      const divkey = (parentkey ? parentkey : '') + 'ch';

      // children are inside a ReactCSSTransitionGroup, in order to animate collapsing/expanding events
      return (
        <ReactCSSTransitionGroup key = {divkey + 'trans'} transitionName='node'
          transitionLeaveTimeout={250} transitionEnterTimeout={250} >
          {lst}
        </ReactCSSTransitionGroup>
      );
    };

    return mountList(this.state.root, 0, false);
  }

  createNodeRow(node, level, key){
    const p = this.props;

    // get the node inner content
    const content = p.innderRender ? p.innderRender(node.item) : node.item;

    // get the icon to be displayed
    const icon = this.resolveIcon(node);

    const waitIcon = node.state === 'expanding' ?
      <div className= "fa fa-refresh fa-fw fa-spin" /> : null;
      // the content
    const nodeIcon = node.leaf ?
      icon :
      <a className="node-link" onClick={this.nodeClick} date-item={key}>
        {icon}
      </a>;

    const nodeRow = (
      <div key= {key} className="node" style={{ marginLeft: (level * 16) + 'px'}}>
        {nodeIcon}
        {content}
      </div>
    );

    // check if wrap the component inside another one
    // provided by the parent Component
    return p.outerRender ? p.outerRender(nodeRow, node.item) : nodeRow;
  }

  resolveIcon(node) {
    let icon;
    if (node.leaf) {
      icon = 'circle-thin';
    }
    else {
      icon = node.state !== 'collapsed' ? 'minus-square-o' : 'plus-square-0';
    }

    var className = 'fa fa-' + icon + 'fa-fw';
    return <i className={className} />;
  }

  nodeClick(evt) {
    const key = evt.currentTarget.getAttribute('data-item');

    let lst =  this.state.root;
    let node = null;

    key.split('.').forEach(index => {
      node = lst[Number(index)];
      lst = node.chidren;
    });

    if (node.state === 'collapsed') {
      this.expandNode(node);
    }else{
      this.collapseNode(node);
    }
  }

  expandNode(node) {
    // children are not loaded?
    if(!node.children){
      node.state = 'expanding';
      this.forceUpdate();

      // load the children
      const self = this;
      this.loadNodes(node)
        .then(res => {
            node.state = 'expanded';
            node.children =  res;
            // force tree to show the new expanded node
            self.forceUpadate();
        })
    }else {
      node.state = 'expanded';
      // force tree to show expanded node
      this.forceUpdate();
    }
  }

  collapseNode(node) {
    node.state = 'collapsed';
    this.forceUpdate();
  }
}
