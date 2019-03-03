import * as React from 'react';
import './Onboarding.css';

// Components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

export interface Props {
  fullScreen: boolean,
}

interface State {
  open: boolean,
  class: string
}

class Onboarding extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      open: true,
      class: ''
    };
  }

  // Close dialog
  onCloseModal = () => {
    this.setState({ open: false });
  };

  public render() {
    const { fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withMobileDialog()(Onboarding);;