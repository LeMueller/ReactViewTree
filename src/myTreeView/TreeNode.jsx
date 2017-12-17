import React from 'react';
import PropTypes from 'prop-types';

export default class TreeNode extends Component{
  state = {
    expended: false,
    show: null,
  }

  handleOnClick(){

  }

  render(){
    const { id, childrenNodes, level, leaf, destination } = this.props;
    return (
      <div id={id} level={level} leaf={leaf} destination={destination}>
        <div>{id}</div>
      </div>
    )
  }

}

TreeNode.propsTypes = {
  id: PropTypes.str.isRequired,
  childrenNodes: PropTypes.array,
  level: PropTypes.number.isRequired,
  leaf: PropTypes.bool.isRequired,
  destination: PropTypes.bool.isRequired
}
