import * as React from 'react';
import './SettingsDialog.css';

// Components
import Loader from '../../components/Loader';
// import { List as VirtList, ListRowProps } from "react-virtualized";
// Components - Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CircularProgress from '@material-ui/core/CircularProgress';

// import SwipeableViews from 'react-swipeable-views';
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
  code: string,
  toggleSettingsDialog: () => {},
  handleCodeChange: (name: string, value: string) => {},
  handleResetSettings: () => {},
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
  loadingResetButton: boolean,
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
      newTeacherCode: '',
      loadingResetButton: false,
    };
  };

  /**
   * Fetches the class and teacher codes on load
   *
   * @memberof SettingsDialog
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
   * Changes between the different tabs
   *
   * @memberof SettingsDialog
   */
  handleTabChange = (event: any, tab: number) => {
    this.setState({ tab });
  };

  /**
   * Handle radio and textfield selects
   *
   * @memberof SettingsDialog
   */
  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    } as unknown as Pick<State, keyof State>);
    this.props.handleCodeChange(name, event.target.value)
  };

  /**
   * Resets the current settings
   *
   * @memberof SettingsDialog
   */
  handleReset = () => {
    this.setState({
      loadingResetButton: true
    });
    this.props.handleResetSettings()
  }

  /**
   * Searches through the class or teacher codes list
   *
   * @memberof SettingsDialog
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

  public render() {
    const { fullScreen, open } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.props.toggleSettingsDialog}
        maxWidth={'lg'}
        className="Dialog-settings--container"
      >
        <DialogTitle id="responsive-dialog-title">{"Settings"}</DialogTitle>
        <Tabs
          value={this.state.tab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          className="Dialog-settings-tabs"
        >
          <Tab label="General" />
          {this.props.userType == 'Student' ? (
            <Tab label="Class code" />
          ) : (
            <Tab label="Teacher code" />
          )}
          {/* <Tab label="Teachers you're following" />
          <Tab label="Rooms you're following" /> */}
        </Tabs>
        <DialogContent className="Dialog-settings--content-container">
          {this.state.tab == 0 && <div className="SettingsDialog--tab-container">
            <div style={{position: 'relative'}}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.loadingResetButton}
                onClick={this.handleReset}
                fullWidth
              >
                Reset settings
              </Button>
              {this.state.loadingResetButton && <CircularProgress size={24} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
              }} />}
            </div>
          </div>}
          {this.state.tab == 1 && (
            <div>
              {this.props.userType == 'Student' ? (
                <div className="SettingsDialog--tab-container">
                  <span className="SettingsDialog--tab-current-code">Your current class: <strong>{this.props.code}</strong></span>
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
                    <div style={{ maxHeight: '500px' }}>
                      <RadioGroup
                        aria-label='Class'
                        name='Class'
                        value={this.state.newClassCode}
                        onChange={this.handleChange('newClassCode')}
                      >
                        {/* <VirtList
                          width={500}
                          height={500}
                          rowHeight={48}
                          overscanRowCount={10}
                          rowRenderer={this.renderRow}
                          rowCount={this.state.classesFiltered.length}
                        /> */}
                        {this.state.classesFiltered.map(item => (
                          <FormControlLabel key={item.Class} value={item.Class} control={<Radio color="primary" />} label={item.Class} />
                        ))}
                      </RadioGroup>
                    </div>
                  ) : <Loader />}
                </div>
              ) : (
                <div>
                <span className="SettingsDialog--tab-current-code">Your current code: <strong>{this.props.code}</strong></span>
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
                    <div style={{ maxHeight: '500px' }}>
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
            </div>
          )}
          {/* {this.state.tab == 2 && <div className="SettingsDialog--tab-container"></div>}
          {this.state.tab == 3 && <div className="SettingsDialog--tab-container"></div>} */}
        </DialogContent>
        <DialogActions>
          <span className="Dialog-settings--actions-message">Settings are automatically saved</span>
          <Button onClick={this.props.toggleSettingsDialog} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withMobileDialog()(SettingsDialog) as any;