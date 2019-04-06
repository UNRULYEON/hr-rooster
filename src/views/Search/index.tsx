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
    console.log(`component will unmount - search`)
    if (this.props.searchbar) {
      this.props.toggleSearchbar()
    }
  }

  componentDidUpdate = () => {
    console.log(`component did updated - search`)
  }

  componentWillReceiveProps = () => {
    console.log(`component recieved props - search`)
  }

  componentWillUpdate = () => {
    console.log(`component will update - search`)
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