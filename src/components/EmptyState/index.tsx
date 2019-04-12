import * as React from 'react';
import './EmptyState.css';

// Material-UI

type Props = {
  kind: string
}

type State = {}

class EmptyState extends React.Component<Props, State> {

  GetMessage = () => {
    switch(this.props.kind) {
      case 'teacher':
        return 'You\'re not following any teachers';
      case 'room':
        return 'You\'re not following any rooms';
      case 'no-schedule':
        return 'No schedule for today';
      case 'no-res':
        return 'No results found';
      default:
        return 'Empty State'
    }
  }

  public render() {
    return (
      <div className="EmptyState--container">
        <span>{this.GetMessage()}</span>
      </div>
    )
  }
}

export default EmptyState as any;