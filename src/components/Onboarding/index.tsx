import * as React from 'react';
import './Onboarding.css';

// Components
import Loader from '../../components/Loader'

// Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
// Input fields
import TextField from '@material-ui/core/TextField';

type Props = {
  fullScreen: boolean,
  saveOnboardingSettings: (userType: string, classCode: string, teacherCode: string) => void
}

type State = {
  open: boolean,
  step: number,
  currentStep: number,
  backButtonDisabled: boolean,
  nextButtonDisabled: boolean,
  userType: string,
  classCode: string,
  teacherCode: string,
  searchfield: string,
  loadingClasses: boolean,
  loadingTeachers: boolean,
  classes: Array<any>,
  classesFiltered: Array<any>,
  teachers: Array<any>,
  teachersFiltered: Array<any>
}

const api: string = 'https://api.hr-rooster.nl/';

class Onboarding extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: true,
      step: 0,
      currentStep: 0,
      backButtonDisabled: false,
      nextButtonDisabled: true,
      userType: '',
      classCode: '',
      teacherCode: '',
      searchfield: '',
      loadingClasses: true,
      loadingTeachers: true,
      classes: [],
      classesFiltered: [],
      teachers: [],
      teachersFiltered: []
    };
  };

  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   *
   * When the help dialog is displayed, the components fetches all the class and teacher codes.
   *
   * @memberof Onboarding
   */
  componentDidMount = () => {
    fetch(`${api}Class?$orderby=Class asc`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          loadingClasses: false,
          classes: data.value,
          classesFiltered: data.value,
        })
      })
    fetch(`${api}Teacher?$orderby=Teacher asc`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          loadingTeachers: false,
          teachers: data.value,
          teachersFiltered: data.value,
        })
      })
  }

  /**
   *  Closes the dialog
   *
   * @memberof Onboarding
   */
  onCloseModal = () => {
    this.setState({ open: false });
  };


  /**
   * Performs checks before moving to the next section
   *
   * @memberof Onboarding
   */
  handleNext = () => {
    let currentStep: number = this.state.currentStep;
    let nextButtonDisabled: boolean = true;
    if (this.state.step + 1 < this.state.currentStep) {
      nextButtonDisabled = false;
    } else if (this.state.step == this.state.currentStep) {
      currentStep = currentStep + 1;
    }
    this.setState(state => ({
      step: state.step + 1,
      currentStep,
      nextButtonDisabled
    }));
  };


  /**
   * Checks to see which step is the previous one and takes apprioprate action.
   *
   * When the previous step is 1, the searchfields and filters are cleared.
   *
   * @memberof Onboarding
   */
  handleBack = () => {
    let currentStep: number = this.state.currentStep;
    let searchfield: string = this.state.searchfield
    let classesFiltered: Array<any> = this.state.classesFiltered;
    let teachersFiltered: Array<any> = this.state.teachersFiltered;
    let classCode: string = this.state.classCode;
    let teacherCode: string = this.state.teacherCode;
    if (this.state.step == 1) {
      classesFiltered = this.state.classes;
      teachersFiltered = this.state.teachers;
      currentStep = 0;
      classCode = '',
      teacherCode = '',
      searchfield = ''
    }
    this.setState(state => ({
      step: state.step - 1,
      searchfield,
      currentStep,
      classCode,
      teacherCode,
      classesFiltered,
      teachersFiltered,
      nextButtonDisabled: false
    }));
  };

  /**
   * Handle radio and textfield selects
   *
   * @memberof Onboarding
   */
  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextButtonDisabled: boolean = true;
    if (event.target.value != '') {
      nextButtonDisabled = false;
    }
    this.setState({
      [name]: event.target.value,
      nextButtonDisabled
    } as unknown as Pick<State, keyof State>);
  };

  /**
   * Handles searching through the class or teacher code list
   *
   * @memberof Onboarding
   */
  handleSearch = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let classesFiltered: Array<any> = this.state.classes;
    let teachersFiltered: Array<any> = this.state.teachers;
    if (name == 'classes' && event.target.value != '') {
      classesFiltered = classesFiltered.filter((item) => {
        return item.Class.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      })
    } else if (name == 'teachers' && event.target.value != '') {
      teachersFiltered = teachersFiltered.filter((item) => {
        return item.Teacher.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      })
    }
    this.setState({
      searchfield: event.target.value,
      classesFiltered,
      teachersFiltered,
    } as unknown as Pick<State, keyof State>);
  };


  /**
   * Returns the content of each step
   *
   * @param {number} stepIndex
   * @returns
   * @memberof Onboarding
   */
  getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Typography variant='h5' gutterBottom>
              Are you a student or teacher?
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Select wether you're a student or teacher. The dashboard will change accordingly.
            </Typography>
            <FormControl required={true}>
              <RadioGroup
                aria-label='User type'
                name='User type'
                value={this.state.userType}
                color="primary"
                onChange={this.handleChange('userType')}
              >
                <FormControlLabel value='Student' control={<Radio color="primary" />} label='Student' />
                <FormControlLabel value='Teacher' control={<Radio color="primary" />} label='Teacher' />
              </RadioGroup>
            </FormControl>
          </div>
        );
      case 1:
        return (
          <div className="Onboarding-dialog--step-2-container">
            {this.state.userType == 'Student' ? (
              <div>
                <Typography variant='h5' gutterBottom>
                  Select your class code
                </Typography>
                <TextField
                  label='Class code'
                  value={this.state.searchfield}
                  onChange={this.handleSearch('classes')}
                  type='search'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
                {!this.state.loadingClasses ? (
                  <div>
                    <RadioGroup
                      aria-label='Class'
                      name='Class'
                      value={this.state.classCode}
                      onChange={this.handleChange('classCode')}
                    >
                      {this.state.classesFiltered.map(item => (
                        <FormControlLabel key={item.Class} value={item.Class} control={<Radio color="primary" />} label={item.Class} />
                      ))}
                    </RadioGroup>
                  </div>
                ) : <Loader />}
              </div>
            ) : (
              <div>
                <Typography variant='h5' gutterBottom>
                  Select your teacher code
                </Typography>
                <TextField
                  label='Teacher code'
                  value={this.state.searchfield}
                  onChange={this.handleSearch('teachers')}
                  type='search'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
                {!this.state.loadingTeachers ? (
                  <div>
                    <RadioGroup
                      aria-label='Class'
                      name='Class'
                      value={this.state.teacherCode}
                      onChange={this.handleChange('teacherCode')}
                    >
                      {this.state.teachersFiltered.map(item => (
                        <FormControlLabel key={item.Teacher} value={item.Teacher} control={<Radio color="primary" />} label={item.Teacher} />
                      ))}
                    </RadioGroup>
                  </div>
                ) : <Loader />}
              </div>
            ) }
          </div>
        );
      case 2:
        return (
          <div>
            <Typography variant='h5' gutterBottom>
              Quick recap
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Here's a recap of everything that you've chosen. You can always edit these in the settings.
            </Typography>
            <Typography variant="body1" gutterBottom>
              You are a: {this.state.userType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {this.state.userType == "Student" ? (
                <span>Your class code is: {this.state.classCode}</span>
              ) : (
                <span>Your teacher code is: {this.state.teacherCode}</span>
              ) }
            </Typography>
          </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  public render() {
    const { fullScreen, saveOnboardingSettings } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        aria-labelledby='responsive-dialog-title'
      >
        {/* <DialogTitle id='responsive-dialog-title'>{'Initial setup'}</DialogTitle> */}
        <DialogContent>
          { this.getStepContent(this.state.step) }
        </DialogContent>
        <MobileStepper
          variant='dots'
          steps={3}
          position='static'
          activeStep={this.state.step}
          nextButton={this.state.step < 2 ? (
            <Button size='small' onClick={this.handleNext} disabled={this.state.nextButtonDisabled}>
              Next
              <KeyboardArrowRight />
            </Button>
          ) : (
            <Button size='small' onClick={() => {
              saveOnboardingSettings(
                this.state.userType,
                this.state.classCode,
                this.state.teacherCode
              )
            }} disabled={false}>
              Finish
              <KeyboardArrowRight />
            </Button>
          )}
          backButton={this.state.step != 0 ? (
            <Button size='small' onClick={this.handleBack} disabled={this.state.step === 0 || this.state.backButtonDisabled}>
              <KeyboardArrowLeft />
              Back
            </Button>
          ) : (
            <div style={{ width: '74.61px' }}></div>
          )}
        />
      </Dialog>
    )
  }
}

export default withMobileDialog()(Onboarding) as any;