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

export interface Props {}

interface State {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
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
        {localStorage.getItem('onboarding') != null ? null : (
          <Onboarding />
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
