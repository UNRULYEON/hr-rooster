import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

// Components
import Onboarding from './components/Onboarding'
import Home from './views/Home'
import Class from './views/Class'
import Teacher from './views/Teacher'
import Room from './views/Room'
import Search from './views/Search'
import SettingsDialog from './components/SettingsDialog'
import HelpDialog from './components/HelpDialog'

// Material Components
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import HelpIcon from '@material-ui/icons/HelpRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
// import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
// import Button from '@material-ui/core/Button';

// Pose
import posed from 'react-pose';

// Images
import logo from './img/svg/hr-logo.svg';


/**
 * Types for the settings which are saved in the local storage
 *
 * @interface Settings
 */
interface Settings {
  userType: string,
  code: string,
  schedule: [],
  teachersWatching: [],
  roomsWatching: []
}

export interface Props {}

/**
 * Types for the state
 *
 * @interface State
 */
interface State {
  userType: string,
  code: string,
  schedule: [],
  teachersWatching: [],
  roomsWatching: [],
  searchbar: boolean,
  query: string,
  settingsDialogOpen: boolean,
  helpDialogOpen: boolean,
  snackbar: boolean,
  snackbarMessage: string,
}

// This is the searchbar container with animation as of the docs of Posed
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

// This is the theme for the searchbar
const themeSearchbar = createMuiTheme({
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#11cb5f' },
  },
  typography: { useNextVariants: true },
});

class App extends React.Component<Props, State> {
  searchbarInput: HTMLInputElement | null;
  searchPage: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      userType: '',
      code: '',
      schedule: [],
      teachersWatching: [],
      roomsWatching: [],
      searchbar: false,
      query: '',
      settingsDialogOpen: false,
      helpDialogOpen: false,
      snackbar: false,
      snackbarMessage: '',
    };
    this.searchPage = React.createRef();
  }

  
  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   *
   * Checks of settings is saved in the local storage. If it is, it's read and saved in the state
   *
   * @memberof App
   */
  componentDidMount = () => {
    let settings = localStorage.getItem('settings');
    if (settings != null) {
      let settingsParsed: Settings = JSON.parse(settings)
      if (settingsParsed != null) {
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

  /**
   * Funtions for saving the onboarding settings. Is called from the Onboarding component
   *
   * @memberof App
   */
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

  /**
   * This function handles changes of text fields and selectors
   *
   * @memberof App
   */
  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    } as unknown as Pick<State, keyof State>);
  };

  /**
   * Function for displaying the snackbar
   *
   * @memberof App
   */
  handleSnackbarOpen = (message: string) => {
    this.setState({ snackbar: true, snackbarMessage: message });
  };

  /**
   * Function for hiding the snackbar
   *
   * @memberof App
   */
  handleSnackbarClose = (reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbar: false });
  };

  /**
   * Function for changes the code. Is called from the SettingsDialog component
   *
   * @memberof App
   */
  handleCodeChange = (name: string, value: string) => {
    this.setState({
      code: value
    })

    let settings: Settings = {
      userType: this.state.userType,
      code: value,
      schedule: this.state.schedule,
      teachersWatching: this.state.teachersWatching,
      roomsWatching: this.state.roomsWatching
    }

    localStorage.setItem('settings', JSON.stringify(settings));
  }

  /**
   * Funtion for resetting the current settings that is saved in the local storage and reloads the website, triggering the check for a new user.
   *
   * @memberof App
   */
  handleResetSettings = () => {
    localStorage.removeItem('settings');
    localStorage.removeItem('new_user');
    location.reload();
  }

  /**
   * Toggles between displaying the searchbar and redirecting to the search page
   *
   * @memberof App
   */
  toggleSearchbarAndRedirect = (history: any) => {
    if (!this.state.searchbar) {
      // Go to search
      history.push('/s')
      this.setState({
        searchbar: !this.state.searchbar
      })
      if (this.searchbarInput) {
        this.searchbarInput.focus()
      }
    } else {
      // Go to previous page
      this.setState({
        query: ''
      })
      history.replace('/')
    }
  }

  /**
   * This function is triggered when the user presses the enter enter key when the searchfield is in focus
   *
   * @memberof App
   */
  keyPress = (e: any) => {
		if(e.keyCode === 13){
      this.searchPage.current.eQ()
    }
  }

  /**
   * Toggles only the searchbar
   *
   * @memberof App
   */
  toggleSearchbar = () => {
    this.setState({
      searchbar: !this.state.searchbar,
      query: ''
    })
  }

  /**
   * Toggles the settings dialog
   *
   * @memberof App
   */
  toggleSettingsDialog = () => {
    this.setState({ settingsDialogOpen: !this.state.settingsDialogOpen })
  }

  /**
   * Toggles the help dialog
   *
   * @memberof App
   */
  toggleHelpDialog = () => {
    this.setState({ helpDialogOpen: !this.state.helpDialogOpen })
  }

  public render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route
              path="/"
              children={({ history }) => (
                <header className="App-header">
                  <Link to="/">
                    <img src={logo} className="App-header-logo" alt="logo" />
                  </Link>
                  <div className="spacer-horizontal" />
                  <Tooltip title="Search" enterDelay={500} leaveDelay={200}>
                    <IconButton aria-label="Search" onClick={() => this.toggleSearchbarAndRedirect(history)}>
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                  <Searchbar
                    className="App-header-searchbar-container"
                    pose={this.state.searchbar ? 'visible' : 'hidden'}
                  >
                    <MuiThemeProvider theme={themeSearchbar}>
                      <input
                        className="App-header-searchbar-input"
                        placeholder="Search"
                        type="search"
                        value={this.state.query}
                        onChange={this.handleChange('query')}
                        onKeyDown={this.keyPress}
                        ref={(input) => { this.searchbarInput = input; }}
                      />
                      <div className="spacer-horizontal" />
                      <IconButton style={{ marginLeft: '16px' }} aria-label="Search" color="inherit" onClick={() => this.toggleSearchbarAndRedirect(history)}>
                        <CloseIcon />
                      </IconButton>
                    </MuiThemeProvider>
                  </Searchbar>
                </header>
              )}
            />
            <Route render={({location}) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={350}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/"
                      exact
                      render={(props) => <Home
                        {...props}
                        userType={this.state.userType}
                        code={this.state.code}
                        teachersWatching={this.state.teachersWatching}
                        roomsWatching={this.state.roomsWatching}
                        handleSnackbarOpen={this.handleSnackbarOpen}
                    />} />
                    <Route path="/c/:code"
                      exact
                      render={(props) => <Class
                        {...props}
                        type={1}
                        handleSnackbarOpen={this.handleSnackbarOpen}
                    />} />
                    <Route path="/t/:code"
                      exact
                      render={(props) => <Teacher
                        {...props}
                        type={2}
                        handleSnackbarOpen={this.handleSnackbarOpen}
                    />} />
                    <Route path="/r/:code"
                      exact
                      render={(props) => <Room
                        {...props}
                        type={4}
                        handleSnackbarOpen={this.handleSnackbarOpen}
                    />} />
                    <Route path={['/s', '/s/:q']}
                      exact
                      render={(props) => <Search
                        searchbar={this.state.searchbar}
                        q={this.state.query}
                        toggleSearchbar={this.toggleSearchbar}
                        ref={this.searchPage}
                        handleSnackbarOpen={this.handleSnackbarOpen}
                        {...props}
                    />} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )} />
          </div>
        </Router>
        {localStorage.getItem('new_user') != null ? null : (
          <Onboarding saveOnboardingSettings={this.saveOnboardingSettings} />
        )}
        <div className="App-settings-container">
          <Tooltip title="Help" enterDelay={500} leaveDelay={200}>
            <IconButton aria-label="Help" onClick={this.toggleHelpDialog}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" enterDelay={500} leaveDelay={200}>
            <IconButton aria-label="Settings" onClick={this.toggleSettingsDialog}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </div>
        <SettingsDialog
          open={this.state.settingsDialogOpen}
          code={this.state.code}
          userType={this.state.userType}
          toggleSettingsDialog={this.toggleSettingsDialog}
          handleCodeChange={this.handleCodeChange}
          handleResetSettings={this.handleResetSettings}
        />
        <HelpDialog
          open={this.state.helpDialogOpen}
          code={this.state.code}
          userType={this.state.userType}
          toggleHelpDialog={this.toggleHelpDialog}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbar}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
      </div>
    );
  }
}

export default App;
