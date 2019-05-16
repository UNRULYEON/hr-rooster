import * as React from 'react';
import { Link } from "react-router-dom";
import './Search.css';

// Components
import EmptyState from '../../components/EmptyState'

// Material-UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

// Theme for the class pill filter
const ClassTheme = createMuiTheme({
  palette: {
    primary: {main: '#ff0000'},
    secondary: {main: '#000'},
    type: 'light'
  },
  typography: { useNextVariants: true },
});

// Theme for the teacher pill filter
const TeacherTheme = createMuiTheme({
  palette: {
    primary: {main: '#0048ff'},
    secondary: {main: '#000'},
    type: 'light'
  },
  typography: { useNextVariants: true },
});

// Theme for the room pill filter
const RoomTheme = createMuiTheme({
  palette: {
    primary: {main: '#00a821'},
    secondary: {main: '#000'},
    type: 'light'
  },
  typography: { useNextVariants: true },
});

type Props = {
  searchbar: boolean,
  q: string,
  toggleSearchbar(): void,
  location: any,
  history: any,
  match: any,
  handleSnackbarOpen: (message: string) => void
}

type State = {
  ClassRes: Array<any>,
  TeacherRes: Array<any>,
  RoomRes: Array<any>,
  ClassFilter: boolean,
  TeacherFilter: boolean,
  RoomFilter: boolean,
  searched: boolean,
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ClassRes: [],
      TeacherRes: [],
      RoomRes: [],
      ClassFilter: false,
      TeacherFilter: false,
      RoomFilter: false,
      searched: false,
    };
  }


  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   *
   * Checks if the searchbar is toggled when this page is displayed. If not, the searchbar is toggled
   *
   * Checks of there is a query in the url.
   *
   * @memberof Search
   */
  componentDidMount = () => {
    if (!this.props.searchbar) {
      this.props.toggleSearchbar()
    }
    if (this.props.match.params.q != undefined) {
      this.fetchClasses(this.props.match.params.q)
      this.fetchTeachers(this.props.match.params.q)
      this.fetchRooms(this.props.match.params.q)
    }
  }

  /**
   * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as cancelled network requests, or cleaning up any DOM elements created in componentDidMount.
   *
   * When the user moves away from the search page, the searchfield is cleared and the searchbar is toggled.
   *
   * @memberof Search
   */
  componentWillUnmount = () => {
    this.setState({
      searched: false
    })
    if (this.props.searchbar) {
      this.props.toggleSearchbar()
    }
  }

  /**
   * This function is run when the user presses enter when the searchfield is active. If the searchfield is not empty, the results will be fetched.
   *
   * @memberof Search
   */
  eQ = () => {
    if (this.props.q != '') {
      this.setState({
        searched: true
      })
      if (!this.state.ClassFilter && !this.state.TeacherFilter && !this.state.RoomFilter) {
        this.fetchClasses(this.props.q)
        this.fetchTeachers(this.props.q)
        this.fetchRooms(this.props.q)
      } else {
        if (this.state.ClassFilter) {
          this.fetchClasses(this.props.q)
        }
        if (this.state.TeacherFilter) {
          this.fetchTeachers(this.props.q)
        }
        if (this.state.RoomFilter) {
          this.fetchRooms(this.props.q)
        }
      }
    }
  }

  /**
   * This function queries the API with the query as searchterm
   *
   * @memberof Search
   */
  fetchClasses = async (query: string) => {
    let result: Array<string> = []
    await fetch(`https://api.hr-rooster.nl/Class?$filter=contains(tolower(Class), tolower('${query}'))`)
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < res.value.length; i++) {
          result.push(res.value[i]);
        }
      })
      .catch(err => this.props.handleSnackbarOpen(`There seems to be a problem. Try reloading the page. ERR: ${err}`))
    this.setState({
      ClassRes: result
    })
  }

  /**
   * This function queries the API with the query as searchterm
   *
   * @memberof Search
   */
  fetchTeachers = async (query: string) => {
    let result: Array<string> = []
    await fetch(`https://api.hr-rooster.nl/Teacher?$filter=contains(tolower(Teacher), tolower('${query}'))`)
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < res.value.length; i++) {
          result.push(res.value[i]);
        }
      })
      .catch(err => this.props.handleSnackbarOpen(`There seems to be a problem. Try reloading the page. ERR: ${err}`))
    this.setState({
      TeacherRes: result
    })
  }

  /**
   * This function queries the API with the query as searchterm
   *
   * @memberof Search
   */
  fetchRooms = async (query: string) => {
    let result: Array<string> = []
    await fetch(`https://api.hr-rooster.nl/Room?$filter=contains(tolower(Room), tolower('${query}'))`)
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < res.value.length; i++) {
          result.push(res.value[i]);
        }
      })
      .catch(err => this.props.handleSnackbarOpen(`There seems to be a problem. Try reloading the page. ERR: ${err}`))
    this.setState({
      RoomRes: result
    })
  }

  public render() {
    return (
      <section className="Search-container">
        <div className="Search--filters-container">
          <MuiThemeProvider theme={ClassTheme}>
            <Chip
              label="Class"
              color={this.state.ClassFilter ? 'primary' : 'secondary'}
              onClick={() => {this.setState({
                ClassFilter: !this.state.ClassFilter
              })}}
              variant="outlined"
              className="Search--filters-chip" />
          </MuiThemeProvider>
          <MuiThemeProvider theme={TeacherTheme}>
            <Chip
              label="Teacher"
              color={this.state.TeacherFilter ? 'primary' : 'secondary'}
              onClick={() => {this.setState({
                TeacherFilter: !this.state.TeacherFilter
              })}}
              variant="outlined"
              className="Search--filters-chip" />
          </MuiThemeProvider>
          <MuiThemeProvider theme={RoomTheme}>
            <Chip
              label="Room"
              color={this.state.RoomFilter ? 'primary' : 'secondary'}
              onClick={() => {this.setState({
                RoomFilter: !this.state.RoomFilter
              })}}
              variant="outlined"
              className="Search--filters-chip" />
          </MuiThemeProvider>
        </div>
        <div className="Search--results-container">
          {this.state.ClassRes.length > 0 && !this.state.ClassFilter && !this.state.TeacherFilter && !this.state.RoomFilter || this.state.ClassRes.length > 0 && this.state.ClassFilter ? (
            <div className="Search--class-container">
              {this.state.ClassRes.map(item => (
                <Link to={`/c/${item.Class}`} className="Search--link" replace>
                  <div key={item.Class} className="Search--class-item-container">{item.Class}</div>
                </Link>
              ))}
            </div>
          ) : null}
          {this.state.TeacherRes.length > 0 && !this.state.ClassFilter && !this.state.TeacherFilter && !this.state.RoomFilter || this.state.TeacherRes.length > 0 && this.state.TeacherFilter ? (
            <div className="Search--teacher-container">
              {this.state.TeacherRes.map(item => (
                <Link to={`/t/${item.Teacher}`}className="Search--link"  replace>
                  <div key={item.Teacher} className="Search--teacher-item-container">{item.Teacher}</div>
                </Link>
              ))}
            </div>
          ) : null}
          {this.state.RoomRes.length > 0 && !this.state.ClassFilter && !this.state.TeacherFilter && !this.state.RoomFilter || this.state.RoomRes.length > 0  && this.state.RoomFilter ? (
            <div className="Search--room-container">
              {this.state.RoomRes.map(item => (
                <Link to={`/r/${item.Room}`}className="Search--link"  replace>
                  <div key={item.Room} className="Search--room-item-container">{item.Room}</div>
                </Link>
              ))}
            </div>
          ) : null}
          {this.state.ClassRes.length == 0 && this.state.TeacherRes.length == 0 && this.state.RoomRes.length == 0 && this.state.searched ? (
            <EmptyState kind="no-res" />
          ) : null}
        </div>
      </section>
    )
  }
}

export default Search as any;