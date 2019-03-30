import * as React from 'react';
import './Class.css';

// Components
import ScheduleToday from '../../components/ScheduleToday'
import ScheduleWeek from '../../components/ScheduleWeek'

type Props = {
  match: any,
  type: number
}

type State = {}

class Class extends React.Component<Props, State> {
  public render() {
    return (
      <section className="Class-container">
        <ScheduleToday code={this.props.match.params.code} type={this.props.type} />
        <ScheduleWeek code={this.props.match.params.code} type={this.props.type} />
      </section>
    )
  }
}

export default Class as any;