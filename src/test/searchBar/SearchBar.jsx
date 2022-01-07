import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  handleSearshChange = ({ currentTarget }) => {
    this.setState({ search: currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { search } = this.state;

    if (search.trim() === '') {
      toast.info("You haven't entered anything", { autoClose: 7000 });
      return;
    }
    this.props.submitFormFinder(search);
    this.setState({ search: '' });
  };

  render() {
    const { handleSubmit, handleSearshChange } = this;
    const { search } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">
              <BsSearch /> Search
            </span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={search}
            onChange={handleSearshChange}
          />
        </form>
      </header>
    );
  }
}
