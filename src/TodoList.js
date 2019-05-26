import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: ['Angular', 'Vue', 'React']
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.addHandler = this.addHandler.bind(this)
    this.removeHandler = this.removeHandler.bind(this)
  }

  changeHandler(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  addHandler() {
    this.setState({
      inputValue: '',
      list: [...this.state.list, this.state.inputValue]
    })
  }

  removeHandler(idx) {
    let list = [...this.state.list]
    list.splice(idx, 1)
    this.setState({ list })
  }

  getTodoItems() {
    return this.state.list.map((item, idx) => {
      return (
        <TodoItem
          key={idx}
          idx={idx}
          content={item}
          delete={this.removeHandler}
        />
      )
    })
  }

  render() {
    return (
      <Fragment>
        <h1 className='title'>TodoList demo</h1>
        <div>
          <input className='form-control' value={this.state.inputValue} onChange={this.changeHandler} />
          <button className='btn' onClick={this.addHandler}>Add</button>
        </div>
        <ul>
          {this.getTodoItems()}
        </ul>
      </Fragment>
    );
  }
}

export default TodoList;
