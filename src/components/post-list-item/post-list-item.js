import React from 'react';

import './post-list-item.css'

const PostListItem = (props) => {

  const { label, onDelete, onToggleImportant, onToggleLiked, important, like } = props
  let classNames = "app-list-item d-flex justify-content-between";

  if (important) {
    classNames = classNames + " important"
  }

  if (like) {
    classNames = classNames + " like"
  }

  return (
    <div className={classNames} >
      <span className="app-list-item-label">
        {label}
      </span>
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-star btn-sm"
          onClick={onToggleImportant}
        >
          <i className="fa fa-star"></i>
        </button>
        <button
          type="button"
          className="btn-trash btn-sm"
          onClick={onDelete}
        >
          <i className="fa fa-trash-o">
          </i>
        </button>
        <i
          className="fa fa-heart"
          onClick={onToggleLiked}
        ></i>
      </div>
    </div>
  )
}

export default PostListItem