import * as React from 'react';
import './SettingsDialog.css';

// Components
import Loader from '../../components/Loader'
// Components - Material UII
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import TextField from '@material-ui/core/TextField';


type Props = {
  fullScreen: boolean,
  open: boolean,
  userType: string,
  toggleSettingsDialog: () => {}
}

type State = {
  searchfield: string,
  loadingClasses: boolean,
  loadingTeachers: boolean,
  classes: Array<any>,
  classesFiltered: Array<any>,
  teachers: Array<any>,
  teachersFiltered: Array<any>
  tab: number,
  newClassCode: string,
  newTeacherCode: string,
}

const api: string = 'https://api.hr-rooster.nl/';

class SettingsDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loadingClasses: true,
      loadingTeachers: true,
      searchfield: '',
      classes: [],
      classesFiltered: [],
      teachers: [],
      teachersFiltered: [],
      tab: 0,
      newClassCode: '',
      newTeacherCode: ''
    };
  };

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
      .catch(err => console.log(err))
    fetch(`${api}Teacher?$orderby=Teacher asc`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          loadingTeachers: false,
          teachers: data.value,
          teachersFiltered: data.value,
        })
      })
      .catch(err => console.log(err))
  }

  handleTabChange = (event: any, tab: number) => {
    this.setState({ tab });
  };

  handleTabChangeIndex = (index: any) => {
    this.setState({ tab: index });
  };

  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    } as unknown as Pick<State, keyof State>);
  };

  // Handle search
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

  public render() {
    const { fullScreen, open } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.props.toggleSettingsDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Settings"}</DialogTitle>
        <Tabs
          value={this.state.tab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Basics" />
          {this.props.userType == 'Student' ? (
            <Tab label="Class code" />
          ) : (
            <Tab label="Teacher code" />
          )}
          <Tab label="Teachers you're following" />
          <Tab label="Rooms you're following" />
        </Tabs>
        <DialogContent>
          <SwipeableViews
            index={this.state.tab}
            onChangeIndex={this.handleTabChangeIndex}
          >
            <div className="SettingsDialog--tab-container"></div>
            {this.props.userType == 'Student' ? (
              <div className="SettingsDialog--tab-container">
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
                      value={this.state.newClassCode}
                      onChange={this.handleChange('newClassCode')}
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
                      value={this.state.newTeacherCode}
                      onChange={this.handleChange('newTeacherCode')}
                    >
                      {this.state.teachersFiltered.map(item => (
                        <FormControlLabel key={item.Teacher} value={item.Teacher} control={<Radio color="primary" />} label={item.Teacher} />
                      ))}
                    </RadioGroup>
                  </div>
                ) : <Loader />}
              </div>
            )}
            <div className="SettingsDialog--tab-container"></div>
            <div className="SettingsDialog--tab-container"></div>
          </SwipeableViews>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.toggleSettingsDialog} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withMobileDialog()(SettingsDialog) as any;