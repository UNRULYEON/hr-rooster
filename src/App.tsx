import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
import CloseIcon from '@material-ui/icons/CloseRounded';
import HelpIcon from '@material-ui/icons/HelpRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
// import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Pose
import posed from 'react-pose';

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
  roomsWatching: [],
  searchbar: boolean,
  query: string,
}

const Searchbar = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: { display: 'flex' },
    transition: {
      default: { ease: 'easeInOut', duration: 150 }
    }
  },
  hidden: {
    opacity: 0,
    applyAtEnd: { display: 'none' },
    transition: {
      default: { ease: 'easeInOut', duration: 150 }
    }
  }
});

const themeSearchbar = createMuiTheme({
  palette: {
    primary: { main: '#000000' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});

class App extends React.Component<Props, State> {
  searchbarInput: HTMLInputElement | null;
  constructor(props: Props) {
    super(props);
    this.state = {
      userType: '',
      code: '',
      schedule: [],
      teachersWatching: [],
      roomsWatching: [],
      searchbar: false,
      query: ''
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

  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    } as unknown as Pick<State, keyof State>);
  };

  toggleSearchBar = () => {
    this.setState({
      searchbar: !this.state.searchbar
    })
    if (this.searchbarInput) {
      this.searchbarInput.focus()
      console.log(this.searchbarInput)
      console.log('focussing search bar input')
    }
  }

  public render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <Link to="/">
                <img src={logo} className="App-header-logo" alt="logo" />
              </Link>
              <div className="spacer-horizontal" />
              <IconButton aria-label="Search" onClick={this.toggleSearchBar}>
                <SearchIcon />
              </IconButton>
                <Searchbar
                  className="App-header-searchbar-container"
                  pose={this.state.searchbar ? 'visible' : 'hidden'}
                >
                  <MuiThemeProvider theme={themeSearchbar}>
                    {/* <TextField
                      className="App-header-searchbar-input"
                      color="inherit"
                      placeholder="Search..."
                      type="search"
                      value={this.state.query}
                      onChange={this.handleChange('query')}
                      margin="none"
                    /> */}
                    <input
                      className="App-header-searchbar-input"
                      placeholder="Search"
                      type="search"
                      value={this.state.query}
                      onChange={this.handleChange('query')}
                      ref={(input) => { this.searchbarInput = input; }}
                    />
                    <div className="spacer-horizontal" />
                    <IconButton style={{ marginLeft: '16px' }} aria-label="Search" color="inherit" onClick={this.toggleSearchBar}>
                      <CloseIcon />
                    </IconButton>
                  </MuiThemeProvider>
                </Searchbar>
            </header>
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
          </div>
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
