import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// Components
import Onboarding from './components/Onboarding'
import Home from './views/Home'

// Material Components
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchRounded';
import HelpIcon from '@material-ui/icons/HelpRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';

// Images
import logo from './img/svg/hr-logo.svg';

interface Settings {
  userType: string,
  code: string,
  schedule: [],
  teachersWatching: [],
  roomsWatching: []
}

export interface Props {}

interface State {
  userType: string,
  code: string,
  schedule: [],
  teachersWatching: [],
  roomsWatching: []
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userType: '',
      code: '',
      schedule: [],
      teachersWatching: [],
      roomsWatching: []
    };
  }

  componentDidMount = () => {
    let settings = localStorage.getItem('settings');
    if (settings != null) {
      let settingsParsed: Settings = JSON.parse(settings)
      if (settings != null) {
        this.setState({
          userType: settingsParsed.userType,
          code: settingsParsed.code,
          schedule: settingsParsed.schedule,
          teachersWatching: settingsParsed.teachersWatching,
          roomsWatching: settingsParsed.roomsWatching
        })
        console.log(settings)
      }
    }
  }

  saveOnboardingSettings = (userType: string, classCode: string, teacherCode: string) => {
    console.log(`Saving onboarding settings...`)

    let code: string;
    if (userType == "Student") {
      code = classCode;
    } else {
      code = teacherCode;
    };

    this.setState({
      userType,
      code
    });

    let settings: Settings = {
      userType: userType,
      code: code,
      schedule: [],
      teachersWatching: [],
      roomsWatching: []
    }

    localStorage.setItem('new_user', 'false');
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-header-logo" alt="logo" />
          <div className="spacer-horizontal" />
          <IconButton aria-label="Delete">
            <SearchIcon />
          </IconButton>
        </header>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}/>
          </Switch>
        </Router>
        {localStorage.getItem('new_user') != null ? null : (
          <Onboarding saveOnboardingSettings={this.saveOnboardingSettings} />
        )}
        <div className="App-settings-container">
          <IconButton aria-label="Help">
            <HelpIcon />
          </IconButton>
          <IconButton aria-label="Settings">
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default App;
