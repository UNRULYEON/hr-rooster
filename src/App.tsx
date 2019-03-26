import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// Components
import Onboarding from './components/Onboarding'
import Home from './views/Home'
import Class from './views/Class'
import Teacher from './views/Teacher'
import Room from './views/Room'

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
      }
    }
  }

  saveOnboardingSettings = (userType: string, classCode: string, teacherCode: string) => {
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
            {/* <Route path="/" exact component={Home}/> */}
            <Route path="/"
              exact
              render={(props) => <Home
                {...props}
                userType={this.state.userType}
                code={this.state.code}
                teachersWatching={this.state.teachersWatching}
                roomsWatching={this.state.roomsWatching}
            />} />
            <Route path="/c/:code"
              exact
              render={(props) => <Class
                {...props}
                type={1}
            />} />
            <Route path="/t/:code"
              exact
              render={(props) => <Teacher
                {...props}
                type={2}
            />} />
            <Route path="/r/:code"
              exact
              render={(props) => <Room
                {...props}
                type={4}
            />} />
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
