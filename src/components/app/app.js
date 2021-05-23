import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { label: "Я изучу реакт быстро", important: false, like: false, id: "1" },
        { label: "Ну, может, не очень быстро", important: true, like: false, id: "2" },
        { label: "Пожалуй, спешка тут не к чему...", important: false, like: false, id: "3" }
      ],
      term: "",
      filter: "all"
    };
    this.maxId = this.state.data.length + 1; // id с которого начинает формироваться новые добавленные айтемы списка

    this.deleteItem = this.deleteItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

  deleteItem(id) {
    this.setState(state => {
      const index = state.data.findIndex(elem => elem.id === id);
      const before = state.data.slice(0, index);
      const after = state.data.slice(index + 1);
      const newArr = [...before, ...after];

      return {
        data: newArr
      }
    });
  }

  onToggleImportant(id) {
    this.setState((state) => {
      const index = state.data.findIndex(elem => elem.id === id);

      let newItem = state.data[index];
      newItem.important = !newItem.important;

      const before = state.data.slice(0, index);
      const after = state.data.slice(index + 1);
      const newArr = [...before, newItem, ...after];

      return {
        data: newArr
      }
    })
  }

  onToggleLiked(id) {
    this.setState((state) => {
      const index = state.data.findIndex(elem => elem.id === id);

      let newItem = state.data[index];
      newItem.like = !newItem.like;

      const before = state.data.slice(0, index);
      const after = state.data.slice(index + 1);
      const newArr = [...before, newItem, ...after];

      return {
        data: newArr
      }
    })
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: this.maxId++
    }

    this.setState(state => {
      const newArr = [...state.data, newItem]
      return {
        data: newArr
      }
    })
  }

  searchPost(items, term) {
    if (term.lenght === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like === true)
    } else { return items }
  }

  onUpdateSearch(term) {
    this.setState({
      term: term
    })
  }

  onFilterSelect(filter) {
    this.setState({
      filter: filter
    })
  }

  render() {
    const allPosts = this.state.data.length;
    const likedPosts = this.state.data.filter(item => item.like === true).length;
    const visiblePosts = this.filterPost(this.searchPost(this.state.data, this.state.term), this.state.filter);
    // const visiblePosts = this.filterPost(this.searchPost(this.state.data, this.state.term), this.state.filter);

    return (
      <div className='app' >

        <AppHeader
          allPosts={allPosts}
          likedPosts={likedPosts} />
        <div className='search-panel d-flex'>
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={this.state.filter}
            onFilterSelect={this.onFilterSelect} />
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked} />
        <PostAddForm
          onAdd={this.addItem} />
      </div>
    )
  }
}
