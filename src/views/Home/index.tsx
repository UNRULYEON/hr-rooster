import * as React from 'react';
import './Home.css';

export interface Props {}

interface State {}

class Home extends React.Component<Props, State> {
  public render() {
    return (
      <section className="Home-container">
        <div className="Home-list-container"></div>
        <div className="Home-list-container"></div>
        <div className="Home-list-container"></div>
      </section>
    )
  }
}

export default Home;