import * as React from 'react';
import './Search.css';

type Props = {
  searchbar: boolean,
  q: string,
  toggleSearchbar(): void,
  location: any,
  history: any,
  match: any,
}

type State = {
  results: [],
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount = () => {
    if (!this.props.searchbar) {
      this.props.toggleSearchbar()
    }
    if (this.props.match.params.q != undefined) {
      console.log(this.props.match.params.q)
    }
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.q != '') {
      console.log(nextProps.q)
    }
  }

  componentWillUnmount = () => {
    if (this.props.searchbar) {
      this.props.toggleSearchbar()
    }
  }

  eQ = () => {
    console.log(`Quering: ${this.props.q}`)
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