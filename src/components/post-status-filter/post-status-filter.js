import React from 'react';

import './post-status-filter.css'

export default class PostStatusFilter extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [
      { name: "all", label: "Все" },
      { name: "like", label: "Понравилось" }
    ]
  }

  render() {
    const buttons = this.buttons.map(button => {
      const activeButton = this.props.filter === button.name;
      let classes = "btn";
      if (activeButton) {
        classes += ' btn-info'
      } else {
        classes += ' btn-outline-secondary'
      }

      return (
        <button
          key={button.name}
          type="button"
          className={classes}
          onClick={(event) => { this.props.onFilterSelect(button.name) }}>{button.label}</button>
      )
    })

    return (
      <div className='btn-group' >
        { buttons}
      </div>
    )
  }
}
