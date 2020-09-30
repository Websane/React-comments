import React from 'react';

const NewComment = (props) => {
  return (
    <div className="comment">
    <p> {props.user} </p>
    <p> {props.comment} </p>
    <small> {props.date} </small>
    <button className="comment__button" title="delete" onClick={props.removeComment}>
      Удалить
    </button>
  </div>
  )
}

export default NewComment;
