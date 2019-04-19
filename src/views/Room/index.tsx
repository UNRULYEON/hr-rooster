import * as React from 'react';
import './Room.css';

// Components
import ScheduleToday from '../../components/ScheduleToday'
import ScheduleWeek from '../../components/ScheduleWeek'

type Props = {
  match: any,
  type: number,
  handleSnackbarOpen: (message: string) => void
}

type State = {}

class Room extends React.Component<Props, State> {
  public render() {
    return (
      <section className="Room-container">
        <ScheduleToday code={this.props.match.params.code} type={this.props.type} handleSnackbarOpen={this.props.handleSnackbarOpen} />
        <ScheduleWeek code={this.props.match.params.code} type={this.props.type} handleSnackbarOpen={this.props.handleSnackbarOpen} />
      </section>
    )
  }
}

export default Room as any;