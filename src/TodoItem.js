import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.removeHandler = this.removeHandler.bind(this)
  }

  removeHandler() {
    const { idx, delete: del } = this.props
    del(idx);
  }

  render() {
    const { content } = this.props

    return (
      <div onClick={this.removeHandler}>- {content}</div>
    );
  }
}

export default TodoItem;
