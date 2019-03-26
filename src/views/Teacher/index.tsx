import * as React from 'react';
import './Teacher.css';

// Components
import ScheduleToday from '../../components/ScheduleToday'

type Props = {
  match: any,
  type: number | string
}

type State = {}

class Teacher extends React.Component<Props, State> {
  public render() {
    return (
      <section className="Teacher-container">
        <ScheduleToday code={this.props.match.params.code} type={this.props.type} />
      </section>
    )
  }
}

export default Teacher as any;