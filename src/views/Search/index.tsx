import * as React from 'react';
import './Search.css';

type Props = {
  searchbar: boolean,
  query: string,
  toggleSearchbar(): void
}

type State = {}

class Search extends React.Component<Props, State> {

  componentDidMount = () => {
    if (!this.props.searchbar) {
      this.props.toggleSearchbar()
    }
  }

  componentWillUnmount = () => {
    if (this.props.searchbar) {
      this.props.toggleSearchbar()
    }
  }

  public render() {
    return (
      <section className="Search-container">
        search
      </section>
    )
  }
}

export default Search as any;