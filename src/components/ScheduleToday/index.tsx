import * as React from 'react';
import './ScheduleToday.css';

// Components

type Props = {
  code: string
}

type State = {
  code: string,
  schedule: []
}

const api: string | undefined = process.env.REACT_APP_API;

class ScheduleToday extends React.Component<Props, State> {
  state: State = {
    code: this.props.code,
    schedule: []
  };

  componentWillReceiveProps = (nextProps: Readonly<Props>) => {
    let today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    let query: string = `${api}${nextProps.code}&type=1&startDate=${today}&endDate=${today}&json`
    console.log(query)
    fetch(query)
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  public render() {
    return (
      <span>{this.props.code}</span>
    )
  }
}

export default ScheduleToday as any;