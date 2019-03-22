import * as React from 'react';
import './Home.css';

// Components
import ScheduleToday from '../../components/ScheduleToday'

type Props = {
  userType: string,
  code: string,
  schedule: [],
  teachersWatching: [],
  roomsWatching: []
}

type State = {}

class Home extends React.Component<Props, State> {
  public render() {
    return (
      <section className="Home-container">
        <div className="Home-list-container">
          <span className="Home-list-container--subtext">Today for</span>
          <ScheduleToday code={this.props.code} />
        </div>
        <div className="Home-list-container">
          <span className="Home-list-container--subtext">Teachers you're following</span>
          {this.props.teachersWatching.length <= 0 ? (
            'You\'re not following any teachers'
          ) : (
            <div>
              render list
            </div>
          )}
        </div>
        <div className="Home-list-container">
          <span className="Home-list-container--subtext">Rooms you're following</span>
          {this.props.teachersWatching.length <= 0 ? (
            'You\'re not following any rooms'
          ) : (
            <div>
              render list
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default Home as any;