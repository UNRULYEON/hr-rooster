import * as React from 'react';
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ScheduleToday.css';

// Components
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

// Material-UI
import LocationOnIcon from '@material-ui/icons/LocationOnRounded';
import ClassIcon from '@material-ui/icons/ClassRounded';
import { __importStar } from 'tslib';

type Lesson = {
  Class: string | null,
  Date: Date,
  DayNumber: string,
  EndTime: string,
  LSID: string,
  PeriodEnd: string,
  PeriodStart: string,
  StartTime: string,
  StartFlags: string | null,
  Subject: string,
  Teacher: string,
  Text: string,
  room: Room
}

type Room = {
  building: string,
  code: string,
  latitude: string,
  longitude: string
}

type Props = {
  code: string,
  type: number,
  handleSnackbarOpen: (message: string) => void
}

type State = {
  code: string,
  schedule: Array<Lesson> | null
}

const api: string | undefined = process.env.REACT_APP_API;

class ScheduleToday extends React.Component<Props, State> {
  state: State = {
    code: this.props.code,
    schedule: []
  };

  _isMounted = false

  /**
   * When this component is mounted and the code in the props is not empty, it fetched data with the code.
   *
   * @memberof ScheduleToday
   */
  componentDidMount = () => {
    this._isMounted = true;
    if (this.props.code != "") {
      let today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      let url: string = `https://cors-anywhere.herokuapp.com/${api}${this.props.code}&type=${this.props.type}&startDate=${today}&endDate=${today}&json`
      fetch(url, {headers: {'Origin': '',}}).then(res => res.json())
        .then(data => {
          if (this._isMounted) {
            if (data.lesson == null) {
              this.setState({
                schedule: null
              })
            } else {
              this.setState({
                schedule: data.lesson
              })
            }
          }
        })
        .catch(err => {
          if (this._isMounted) {
            this.props.handleSnackbarOpen(`There seems to be a problem. Try reloading the page. ERR: ${err}`)
          }
        })
    }
  }

  /**
   * This only runs when the user finishes the onboarding. Fetches data with the code.
   *
   * @memberof ScheduleToday
   */
  componentWillReceiveProps = (nextProps: Readonly<Props>) => {
    if (nextProps.code != this.props.code) {
      let today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      let url: string = `https://cors-anywhere.herokuapp.com/${api}${nextProps.code}&type=${this.props.type}&startDate=${today}&endDate=${today}&json`
      fetch(url, {headers: {'Origin': '',}}).then(res => res.json())
        .then(data => {
          if (this._isMounted) {
            if (data.lesson == null) {
              this.setState({
                schedule: null
              })
            } else {
              this.setState({
                schedule: data.lesson
              })
            }
          }
        })
        .catch(err => this.props.handleSnackbarOpen(`There seems to be a problem. Try reloading the page. ERR: ${err}`))
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  /**
   * Accepts a string with multiple codes and returns an array with Link elements.
   *
   * @memberof ScheduleToday
   */
  getParsedCode = (code: string, type: string) => {
    let regex: RegExp = /(.+?)(?:,|$)/g;
    let regexParsed: string[] | null = code.match(regex);
    let parsed: any[] = [];
    if (regexParsed != null) {
      for (let i = 0; i < regexParsed.length; i++) {
        parsed.push(
          <Link to={`/${type}/${regexParsed[i].replace(/[, ]+/g, " ").trim()}`}>{regexParsed[i].replace(/[, ]+/g, " ").trim()}</Link>
        )
        if (regexParsed.length != 1 && i < regexParsed.length - 1) {
          parsed.push(', ')
        }
      }
    }
    return parsed
  }

  /**
   * Returns the time with a : inbetween the hours and minutes
   *
   * @memberof ScheduleToday
   */
  getTime = (time: string) => {
    if(time.length < 4) {
      return `${time.substring(0,1)}:${time.substring(1,3)}`
    } else {
      return `${time.substring(0,2)}:${time.substring(2,4)}`
    }
  }

  /**
   * Returns a type based on what's in the props.
   *
   * @memberof ScheduleToday
   */
  getLink = () => {
    switch (this.props.type) {
      case 1:
        return "c"
      case 2:
        return "t"
      case 4:
        return "r"
      default:
        return ""
    }
  }

  /**
   * Checks if it's the current lesson. If so, this function returns a class with a circle
   *
   * @memberof ScheduleToday
   */
  isCurrentLesson = (s: string, e: string, type: number) => {
    let start: number = parseInt(s);
    let end: number = parseInt(e);
    let currentTime: number = parseInt(`${new Date().getHours()}${new Date().getMinutes() < 10 ? "0" +  new Date().getMinutes() : new Date().getMinutes() }`);
    if (start <= currentTime && currentTime <= end) {
      switch (type){
        case 0:
          return "SchedToday--item-container-current"
        case 1:
          return "SchedToday--item-container-current-circle"
        default:
          return ""
      }
    } else {
      return ""
    }
  }

  public render() {
    return (
      <div style={{ width: '-webkit-fill-available' }}>
        <span className="SchedToday--title"><Link to={`/${this.getLink()}/${this.props.code.toUpperCase()}`}>{this.props.code.toUpperCase()}</Link></span>
        {this.state.schedule != null ? (
            <div className="SchedToday--wrapper" style={{ height: `${this.state.schedule.length > 0 ? this.state.schedule.length * 120 + "px" : '200px'}` }}>
              <TransitionGroup>
                <CSSTransition
                  timeout={350}
                  key={`${this.state.schedule.length > 0 ? 1 : 0}`}
                  classNames="fade"
                >
                  {this.state.schedule.length > 0 ? (
                  <div key={1} className={`SchedToday--container`} style={{
                    // gridTemplateColumns: `95px 30px 1fr`,
                    // gridTemplateRows: `repeat(${this.state.schedule.length}, 1fr)`,
                    gridTemplate: `repeat(${this.state.schedule.length}, [row] 1fr) / 70px 50px 1fr`,
                  }}>
                    <div className={`SchedToday--line-container`} style={{ gridRowEnd: `${this.state.schedule.length + 1}` }}>
                      <div className="SchedToday--line"></div>
                    </div>
                    {this.state.schedule.map((item, index) => (
                      <div key={`${item.LSID}-${index}`} className={`SchedToday--item-container ${this.isCurrentLesson(item.StartTime, item.EndTime, 0)}`} style={{gridRowStart: `${index + 1}`}}>
                        <div className="SchedToday--item-time">
                          <div className="SchedToday--item-time-start">
                            {item.PeriodStart != null ? (
                              <span className="SchedToday--item-start-period">{item.PeriodStart}</span>
                            ) : null}
                            <span>-</span>
                            {item.StartTime != null ? (
                              <span className="SchedToday--item-start-time">{this.getTime(item.StartTime)}</span>
                            ) : null}
                          </div>
                          <div className="SchedToday--item-time-end">
                            {item.PeriodEnd != null ? (
                              <span className="SchedToday--item-end-period">{item.PeriodEnd}</span>
                            ) : null}
                            <span>-</span>
                            {item.EndTime != null ? (
                              <span className="SchedToday--item-end-time">{this.getTime(item.EndTime)}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="SchedToday--item-circle-container">
                          <div className={`SchedToday--item-circle ${this.isCurrentLesson(item.StartTime, item.EndTime, 1)}`}></div>
                        </div>
                        <div className="SchedToday--item-details">
                          {item.Subject != null ? (
                            <span className="SchedToday--item-details-subject" style={{ display: 'block' }}>{item.Subject}</span>
                          ) : item.Text != null ? (
                            <span className="SchedToday--item-details-subject" style={{ display: 'block' }}>{item.Text}</span>
                          ) : null}
                          {item.Class != null ? (
                            <span className="SchedToday--item-details-class-teacher" style={{ display: 'inline' }}><ClassIcon className="SchedToday--item-details-icon" />{this.getParsedCode(item.Class.toUpperCase(), 'c')}</span>
                          ) : null}
                          {item.Class != null && item.Teacher != null ? (
                            <span style={{ display: 'inline' }}> - </span>
                          ) : null}
                          {item.Teacher != null ? (
                            <span className="SchedToday--item-details-class-teacher" style={{ display: 'inline' }}>{this.getParsedCode(item.Teacher.toUpperCase(), 't')}</span>
                          ) : null}
                          {item.room != null ? (
                            <span className="SchedToday--item-details-room"><LocationOnIcon className="SchedToday--item-details-icon" />{this.getParsedCode(item.room.code.toUpperCase(), 'r')}</span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <Loader key={0} />}
                </CSSTransition>
              </TransitionGroup>
            </div>
          ) :
          <EmptyState kind='no-schedule' />}
      </div>
    )
  }
}

export default ScheduleToday as any;