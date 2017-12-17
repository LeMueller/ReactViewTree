import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    id: 'rootId',
    children: [
        {
            name: 'parent',
            id: 'parentId',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            id: 'loading parentId',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            id: 'parent2Id',
            children: [
                {
                    name: 'nested parent',
                    id: 'nested parentId',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

export default class TreeView extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount(){
      // console.log(this.state);
    }

    componentDidUpdate(){
      // console.log(this.state);
    }

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    render(){
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
            />
        );
    }
}
