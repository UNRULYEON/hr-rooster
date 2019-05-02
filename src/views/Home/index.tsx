import * as React from 'react';
import './Home.css';

// Components
import ScheduleToday from '../../components/ScheduleToday'
// import EmptyState from '../../components/EmptyState'

type Props = {
  userType: string,
  code: string,
  schedule: [],
  teachersWatching: [],
  roomsWatching: [],
  handleSnackbarOpen: (message: string) => void
}

type State = {}

class Home extends React.Component<Props, State> {

  getSchedTodayUserType = (settings: any) => {
    if (settings != null) {
      let settingsParsed: any = JSON.parse(settings)
      if (settingsParsed != null) {
        return settingsParsed.userType == 'Student' ? 1 : 2
      }
    }
    return 1
  }

  public render() {
    return (
      <section className="Home-container">
        <div className="Home-list-container">
          <span className="Home-list-container--subtext">Today's schedule for</span>
          <ScheduleToday code={this.props.code} type={this.getSchedTodayUserType(localStorage.getItem('settings'))} handleSnackbarOpen={this.props.handleSnackbarOpen} />
        </div>
        {/* <div className="Home-list-container">
          <span className="Home-list-container--subtext">Teachers you're following</span>
          {this.props.teachersWatching.length > 0 ? (
            <div>
              render list
            </div>
          ) : (
            <EmptyState kind={'teacher'} />
          )}
        </div>
        <div className="Home-list-container">
          <span className="Home-list-container--subtext">Rooms you're following</span>
          {this.props.teachersWatching.length > 0 ? (
            <div>
              render list
            </div>
          ) : (
            <EmptyState kind={'room'} />
          )}
        </div> */}
      </section>
    )
  }
}

export default Home as any;