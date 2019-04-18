import * as React from 'react';
import './Loader.css';

// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {}

type State = {}

class Loader extends React.Component<Props, State> {

  public render() {
    return (
      <div className="Loader--container">
        <div className="Loader--circular-container">
          <CircularProgress className="Loader--circular" size={60} thickness={5} />
        </div>
      </div>
    )
  }
}

export default Loader as any;