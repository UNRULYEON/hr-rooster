import * as React from 'react';
import './Onboarding.css';

// Components
// Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
// Mobile stepper
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// Typography
import Typography from '@material-ui/core/Typography';
// Radio controls
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export interface Props {
  fullScreen: boolean,
}

interface State {
  open: boolean,
  step: number,
  backButtonDisabled: boolean,
  nextButtonDisabled: boolean,
  userType: string,
  class: string
}

class Onboarding extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      open: true,
      step: 0,
      backButtonDisabled: false,
      nextButtonDisabled: true,
      userType: '',
      class: ''
    };
  };

  // Close dialog
  onCloseModal = () => {
    this.setState({ open: false });
  };

  // Handle the next click
  handleNext = () => {
    this.setState(state => ({ step: state.step + 1 }));
  };

  // Handle the previous click
  handleBack = () => {
    this.setState(state => ({ step: state.step - 1 }));
  };

  // Handle radio selects
  handleChange = (event: any) => {
    this.setState({
      userType: event.target.value,
      nextButtonDisabled: false
    });
  };


  getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Typography variant="h5" gutterBottom>
              Are you a student or teacher?
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Select wether you're a student or teacher. The dashboard will change accordingly.
            </Typography>
            <FormControl required={true}>
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                value={this.state.userType}
                onChange={this.handleChange}
              >
                <FormControlLabel value="Student" control={<Radio />} label="Student" />
                <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
              </RadioGroup>
            </FormControl>
          </div>
        );
      case 1:
        return (
          <div>
            
          </div>
        );
      case 2:
        return (
          <div>

          </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  public render() {
    const { fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Initial setup"}</DialogTitle>
        <DialogContent>
          { this.getStepContent(this.state.step) }
        </DialogContent>
        <MobileStepper
          variant="dots"
          steps={6}
          position="static"
          activeStep={this.state.step}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={this.state.step === 5 || this.state.nextButtonDisabled}>
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={this.state.step === 0 || this.state.backButtonDisabled}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Dialog>
    )
  }
}

export default withMobileDialog()(Onboarding);;