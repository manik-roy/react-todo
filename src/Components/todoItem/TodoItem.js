import React from 'react';

const TodoItem = (props) => {
  const { name, isActive, id } = props.todo;
  return (
    <div className="list-group-item align-items-center d-flex justify-content-between border-bottom shadow my-1" >
      <span className={isActive ? 'text-success' : 'line-through'} >{name}</span>
      <div className="buttons-group my-2">
        <button
          onClick={() => props.doneTodo(id)}
          className="btn btn-sm btn-success mr-2"><i className="fa fa-check"></i>
        </button>
        <button
          onClick={() => props.removeTodo(id)}
          className="btn btn-sm btn-danger"><i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;